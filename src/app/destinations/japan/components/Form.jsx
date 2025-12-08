"use client";

import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().max(60, "Max 60 characters").required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().max(30, "Too long"),
});

export default function FormJapan({ open, course, onClose }) {
  if (!open || !course) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-[#fff5f0]/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 sm:p-7 w-full max-w-2xl relative shadow-xl border border-[#f0e6e6]">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-[#ff6f61]/80 hover:text-[#ff6f61]"
          aria-label="Close"
        >
          &times;
        </button>

        <div className="mb-4 text-left">
          <h2 className="text-xl sm:text-2xl font-bold text-[#110053]">
            Apply for this course
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#4a4560]">
            Fill in your details and our counsellor will contact you about{" "}
            <span className="font-semibold">
              {course.title || course.name}
            </span>.
          </p>
        </div>

        <div className="mb-5 rounded-xl bg-[#fff0f0] border border-[#f0e6e6] px-4 py-3 text-left">
          <div className="text-xs sm:text-sm font-semibold text-[#110053]">
            {course.title || course.name}
          </div>
          <div className="text-[11px] sm:text-xs text-[#4a4560] mt-1">
            {course.institution || course.name}
          </div>
        </div>

        <Formik
          initialValues={{ name: "", email: "", phone: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            alert(
              `Application for ${course.title || course.name} sent!\n\nName: ${
                values.name
              }\nEmail: ${values.email}\nPhone: ${values.phone}`
            );
            resetForm();
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <FormikForm className="flex flex-col gap-4 text-left w-full">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-[#4a4560]">
                    Full name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full rounded-lg px-3 py-2 border border-[#f0e6e6] text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6f61]/60"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-[11px] text-red-500 mt-0.5"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-[#4a4560]">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg px-3 py-2 border border-[#f0e6e6] text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6f61]/60"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-[11px] text-red-500 mt-0.5"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#4a4560]">
                  Phone (optional)
                </label>
                <Field
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="w-full rounded-lg px-3 py-2 border border-[#f0e6e6] text-sm focus:outline-none focus:ring-2 focus:ring-[#ff6f61]/60"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-[11px] text-red-500 mt-0.5"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-[#4a4560]">
                  Selected course
                </label>
                <input
                  type="text"
                  value={course.title || course.name || ""}
                  disabled
                  className="w-full rounded-lg px-3 py-2 border border-[#f0e6e6] text-sm bg-[#fff0f0] text-[#4a4560]"
                />
              </div>

              <div className="mt-3 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-[#4a4560] border border-[#f0e6e6] rounded-lg hover:bg-[#fff0f0] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2 bg-gradient-to-r from-[#ff6f61] to-[#ff9f81] text-xs font-semibold text-white rounded-lg shadow hover:shadow-md hover:scale-[1.02] transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Submitting..." : "Submit application"}
                </button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
}

// Example usage for Japan
/*
<FormJapan
  open={true}
  course={{
    title: "Bachelor of International Business",
    institution: "University of Tokyo"
  }}
  onClose={() => console.log("Closed")}
/>
*/
