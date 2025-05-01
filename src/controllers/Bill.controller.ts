import { Request, Response, NextFunction, RequestHandler } from "express";
import * as billService from "../services/Bill.service";
import { IMainBill, MainBill } from "../models/Bill.model";
import HospitalService from "../models/HospitalService.model";
import Treatment from "../models/Treatment.model";
import Patient from "../models/Patient";
import { sendSMS } from "../util/sendSMS";
import { sendReportEmail, transporter } from "../services/emailService";

export const searchPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const patient = await billService.getPatientDetails(id);
    res.json({ success: true, data: patient });
  } catch (error) {
    next(error);
  }
};

interface AddBillBody {
  patientId: string;
  dailyAmount: number;
  hospitalServices?: string[];
  treatments?: string[];
}

export const addBillController: RequestHandler<
  Record<string, never>, // URL params – none
  any, // response body (we send JSON)
  AddBillBody, // request body
  Record<string, never> // query string – none
> = async (req, res, next) => {
  try {
    const {
      patientId,
      dailyAmount,
      hospitalServices = [],
      treatments = [],
    } = req.body;

    const mainBill = await billService.addSubBill(
      patientId,
      dailyAmount,
      hospitalServices,
      treatments
    );

    res.status(201).json({ success: true, data: mainBill });
  } catch (err) {
    next(err);
  }
};

export const checkoutPatientController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params; // Patient ID
    const { insuranceCoverage } = req.body;

    // Find the patient's main bill
    const mainBill = await MainBill.findOne({ patientId: id });

    if (!mainBill) {
      res
        .status(404)
        .json({ success: false, message: "Main bill for patient not found" });
      return;
    }

    // If insurance coverage is provided, calculate the new final amount
    if (insuranceCoverage) {
      mainBill.insuranceCoverage = insuranceCoverage;
      mainBill.finalAmount = Math.max(
        mainBill.finalAmount - insuranceCoverage,
        0
      ); // Ensure it doesn't go negative
    }

    mainBill.isCheckedOut = true;

    // Save the updated bill
    await mainBill.save();

    res.json({ success: true, data: mainBill });
  } catch (error) {
    next(error);
  }
};

export const getPatientBill = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params; // patient mongo id
    const bill = await MainBill.findOne({ patientId: id });
    if (!bill) {
      res.status(404).json({ success: false, message: "Bill not found" });
      return;
    }
    res.json({ success: true, data: bill });
  } catch (error) {
    next(error);
  }
};

export const getHospitalServices = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const services = await HospitalService.find({});
    res.json({ success: true, data: services });
  } catch (error) {
    next(error);
  }
};

export const getTreatments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const treatments = await Treatment.find({});
    res.json({ success: true, data: treatments });
  } catch (error) {
    next(error);
  }
};

export const createSMSController = async (
  req: Request, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const { patientId, billId, message } = req.body;
    const sms = await billService.createSMSRecord(patientId, billId, message);

    const patient = await Patient.findById(patientId);
    const verifiedPhoneNumber = '+94719095637';

    if (patient) {
      console.log(`Sending SMS to ${verifiedPhoneNumber}`);
      const result = await sendSMS(verifiedPhoneNumber, message);

      if (!result.success) {
        console.warn('Failed to send SMS:', result.error);
      }
    } else {
      console.warn('Patient not found. SMS not sent.');
    }

    res.status(201).json({ success: true, data: sms });
  } catch (error) {
    next(error);
  }
};

export const getSMSMessagesController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { patientId } = req.params;
    const smsMessages = await billService.getSMSMessages(patientId);
    res.json({ success: true, data: smsMessages });
  } catch (error) {
    next(error);
  }
};

export const editBillController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { billId } = req.params;
    const updateData = req.body; // expect hospitalServices, treatments, insuranceCoverage, isCheckedOut
    const updatedBill = await billService.editBill(billId, updateData);
    res.json({ success: true, data: updatedBill });
  } catch (error) {
    next(error);
  }
};

export const deleteBillController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { billId } = req.params;
    await billService.removeBill(billId);
    res.json({ success: true, message: "Bill deleted" });
  } catch (error) {
    next(error);
  }
};

export const editSubBillController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { billId, subBillId } = req.params;
    const { dailyAmount, hospitalServices, treatments } = req.body;
    const updated = await billService.editSubBill(billId, subBillId, {
      dailyAmount,
      hospitalServices,
      treatments,
    });
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const deleteSubBillController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { billId, subBillId } = req.params;
    const updated = await billService.removeSubBill(billId, subBillId);
    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

export const sendReportByEmailController: RequestHandler<
  { patientId: string },
  { success: boolean; message?: string },
  { html: string; to: string; logoDataUrl: string }
> = async (req, res, next) => {
  const { patientId } = req.params;
  let { html, to, logoDataUrl } = req.body;

  try {
    // Extract the base64 payload (after the comma)
    const base64Match = logoDataUrl.match(/^data:image\/\w+;base64,(.+)$/);
    if (!base64Match) {
      throw new Error("Invalid logo data URL");
    }
    const base64Data = base64Match[1];

    html = html.replace(
      /<img[^>]+src="data:image\/[^"]+"[^>]*>/,
      `<img src="cid:clinitech_logo" alt="Hospital Logo" />`
    );

    // Send mail with an inline attachment
    const info = await transporter.sendMail({
      from: `"CliniTech Hospital" <${process.env.SMTP_FROM}>`,
      to,
      subject: "Your Medical Report from CliniTech Hospital",
      html,
      attachments: [
        {
          filename: "logo.png",
          content: Buffer.from(base64Data, "base64"),
          cid: "clinitech_logo",        // must match the img src=cid: value
        },
      ],
    });

    console.log("Email sent, info=", {
      messageId: info.messageId,
      accepted: info.accepted,
    });
    res.json({ success: true });

  } catch (err: any) {
    console.error("sendReportByEmailController error:", err);
    next(err);
  }
};

