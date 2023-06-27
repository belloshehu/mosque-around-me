"use client";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { styles } from "../styles";
import CustomInputField from "./CustomInputField";
import PhoneNumberField from "./PhoneNumberField";
import CustomSelectField from "./CustomSelectField";

const MosqueAdminForm = () => {
  return (
    <div className="w-full lg:w-1/3 bg-gradient-to-tr lg:border-2 lg:p-10 rounded-md">
      <Formik
        initialValues={{
          // email: "",
          // phoneNumber: "",
          // fullName: "",
          address: "",
          state: "",
          city: "",
          country: "",
          mosqueName: "",
          positionInMosque: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("submitting..", values);
        }}
        validationSchema={Yup.object({
          // fullName: Yup.string().required("Fullname required"),
          address: Yup.string().required("Address required"),
          city: Yup.string().required("City required"),
          state: Yup.string().required("State required"),
          country: Yup.string().required("Country required"),
          mosqueName: Yup.string().required("Mosque name required"),
          // phoneNumber: Yup.string().required("Phone number required"),
          positionInMosque: Yup.string().required("Position required"),
          // email: Yup.string()
          //   .email("Invalid email address")
          //   .required("Email is required"),
        })}>
        <Form>
          <div className="flex flex-col items-center justify-center gap-2 md:gap-5 w-full">
            {/* <CustomInputField
              name="fullName"
              label="Full name"
              placeholder="Full name"
              type="text"
            />
            <CustomInputField
              name="email"
              label="Email"
              placeholder="Email"
              type="email"
            /> */}

            {/* <PhoneNumberField
              label="Phone number"
              defaultCountry="NG"
              name="phoneNumber"
              placeholder="Phone number"
              styleValue={styles.input}
            /> */}

            <CustomInputField
              name="mosqueName"
              label="Mosque name"
              placeholder="Your mosque name"
              type="text"
            />
            <CustomSelectField
              name="positionInMosque"
              label="Position (In the mosque)">
              <option value="">Select a position</option>
              <option value="imam">Imam</option>
              <option value="muaddhin">Muaddhin</option>
              <option value="follower">Follower</option>
            </CustomSelectField>

            <CustomInputField
              name="address"
              label="Address"
              placeholder="Your address"
              type="text"
            />
            <CustomInputField
              name="city"
              label="City"
              placeholder="Your city"
              type="text"
            />
            <div className="flex flex-col lg:flex-row items-center  gap-2 w-full">
              <CustomInputField
                name="state"
                label="State/Region"
                placeholder="Your State"
                type="text"
              />
              <CustomInputField
                name="country"
                label="Country"
                placeholder="Country"
                type="text"
              />
            </div>

            <button type="submit" className={`${styles.buttonFluid}`}>
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default MosqueAdminForm;
