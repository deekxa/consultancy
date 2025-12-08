"use client";

import { Formik, Form as FormikForm, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().max(60).required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().max(30, "Too long"),
});

export default function FormNZ({ open, course, onClose }) {
  if (!open || !course) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-[#f5f3ff]/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 sm:p-7 w-full max-w-2xl relative shadow-xl border border-[#e6def8]">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-2xl font-bold text-[#8b7ae8]/80 hover:text-[#8b7ae8]"
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
            </span>
            .
          </p>
        </div>

        <div className="mb-5 rounded-xl bg-[#f6f4ff] border border-[#e6def8] px-4 py-3 text-left">
          <div className="text-xs sm:text-sm font-semibold text-[#110053]">
            {course.title || course.name}
          </div>
          <div className="text-[11px] sm:text-xs text-[#4a4560] mt-1">
            {course.institution || "Institution"}
          </div>
        </div>

        <Formik
          initialValues={{ name: "", email: "", phone: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            alert(
              `Application for ${course.title} sent!\n\nName: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}`
            );
            resetForm();
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <FormikForm className="flex flex-col gap-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#4a4560]">Full name</label>
                  <Field
                    name="name"
                    placeholder="Enter your full name"
                    className="w-full rounded-lg px-3 py-2 border border-[#e6def8] text-sm focus:ring-2 focus:ring-[#8b7ae8]/60"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-[11px] text-red-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-[#4a4560]">Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg px-3 py-2 border border-[#e6def8] text-sm focus:ring-2 focus:ring-[#8b7ae8]/60"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-[11px] text-red-500"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#4a4560]">
                  Phone (optional)
                </label>
                <Field
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  className="w-full rounded-lg px-3 py-2 border border-[#e6def8] text-sm focus:ring-2 focus:ring-[#8b7ae8]/60"
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-[11px] text-red-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs text-[#4a4560]">Selected course</label>
                <input
                  value={course.title}
                  disabled
                  className="w-full rounded-lg px-3 py-2 border border-[#e6def8] bg-[#f0edff] text-sm text-[#4a4560]"
                />
              </div>

              <div className="mt-3 flex flex-col sm:flex-row gap-3 sm:justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs border border-[#e6def8] rounded-lg hover:bg-[#f6f4ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-gradient-to-r from-[#8b7ae8] to-[#a89fff] text-white text-xs font-semibold rounded-lg shadow"
                >
                  {isSubmitting ? "Submitting…" : "Submit application"}
                </button>
              </div>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
}
