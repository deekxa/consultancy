"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

// Validation Schema for Class Enrollment
const enrollmentSchema = Yup.object({
  fullName: Yup.string().min(2, "Name must be at least 2 characters").required("Full name is required"),
  email: Yup.string().email("Invalid email address").required("Email is required"),
  phone: Yup.string().matches(/^[+]?[\d\s-()]+$/, "Invalid phone number").required("Phone number is required"),
  courseInterest: Yup.string().required("Please select a course"),
  preferredBatch: Yup.string(),
  currentLevel: Yup.string(),
  message: Yup.string(),
  consent: Yup.boolean().oneOf([true], "You must accept the terms").required("Consent is required"),
});

export default function ContactPage() {
  const [status, setStatus] = useState({ loading: false, success: null, message: "" });

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      courseInterest: "",
      preferredBatch: "",
      currentLevel: "",
      message: "",
      consent: false,
    },
    validationSchema: enrollmentSchema,
    onSubmit: async (values, { resetForm }) => {
      setStatus({ loading: true, success: null, message: "Sending..." });

      try {
        const res = await fetch('/api/enroll', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (!res.ok) throw new Error('Server error');

        setStatus({
          loading: false,
          success: true,
          message: 'Enrollment request submitted! We will contact you within 24 hours.'
        });
        resetForm();
      } catch (err) {
        const subject = encodeURIComponent('Class Enrollment Request');
        const body = encodeURIComponent(
          `Name: ${values.fullName}\nEmail: ${values.email}\nPhone: ${values.phone}\nCourse: ${values.courseInterest}\nMessage: ${values.message}`
        );
        window.location.href = `mailto:info@educationtreeglobal.com?subject=${subject}&body=${body}`;
        setStatus({ loading: false, success: null, message: 'Opening your email client...' });
      }
    },
  });

  // WhatsApp integration
  const whatsappNumber = "+977-71-XXXXXX";
  const whatsappMessage = encodeURIComponent("Hi, I'd like to book a free consultation for studying abroad.");
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`;

  return (
    <main className="min-h-screen w-full bg-white">
      {/* Hero Section with Lottie Animation */}
      <section className="max-w-7xl mx-auto mt-24 px-6 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#110053] mb-4">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-[#4a4560] max-w-2xl leading-relaxed mb-6">
            Have questions about studying abroad? Our counselors are here to guide you every step of the way.
          </p>
        </div>
        <div className="w-full md:w-96 h-72">
          <DotLottieReact
            src="https://lottie.host/b1d9913d-38fe-423d-bea3-bc4d62bce964/uwbsdLdyVl.lottie"
            loop
            autoplay
          />
        </div>
      </section>

      {/* Main Content - Ultra Minimal Design */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-16">
          
          {/* LEFT - Minimal Contact Info */}
          <div className="lg:col-span-1 space-y-12">
            
            {/* Call Us - Minimal */}
            <div className="group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-8 bg-[#8b7ae8] group-hover:h-10 transition-all"></div>
                <h3 className="text-lg font-bold text-[#110053] uppercase tracking-wider">Call Us</h3>
              </div>
              <div className="pl-5 space-y-2 text-[#4a4560] text-lg">
                <p className="hover:text-[#8b7ae8] transition-colors cursor-pointer">1 (234) 567-891</p>
                <p className="hover:text-[#8b7ae8] transition-colors cursor-pointer">1 (234) 987-654</p>
              </div>
            </div>

            {/* Location - Minimal */}
            <div className="group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-8 bg-[#8b7ae8] group-hover:h-10 transition-all"></div>
                <h3 className="text-lg font-bold text-[#110053] uppercase tracking-wider">Location</h3>
              </div>
              <div className="pl-5 text-[#4a4560] text-lg leading-relaxed">
                <p>121 Rock Street, 21 Avenue,</p>
                <p>New York, NY 92103-9000</p>
              </div>
            </div>

            {/* Business Hours - Minimal */}
            <div className="group">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-8 bg-[#8b7ae8] group-hover:h-10 transition-all"></div>
                <h3 className="text-lg font-bold text-[#110053] uppercase tracking-wider">Hours</h3>
              </div>
              <div className="pl-5 space-y-2 text-[#4a4560] text-lg">
                <p className="flex justify-between max-w-xs">
                  <span>Mon – Fri</span>
                  <span className="font-medium text-[#110053]">10 am – 8 pm</span>
                </p>
                <p className="flex justify-between max-w-xs">
                  <span>Sat, Sun</span>
                  <span className="font-medium text-[#110053]">Closed</span>
                </p>
              </div>
            </div>

            {/* WhatsApp - Minimal Button */}
            <a 
              href={whatsappLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-green-600 hover:text-green-700 transition-colors text-lg font-semibold"
            >
              <div className="w-12 h-12 rounded-full bg-green-100 group-hover:bg-green-600 flex items-center justify-center transition-colors">
                <svg className="w-6 h-6 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <span className="group-hover:translate-x-1 transition-transform">Chat on WhatsApp</span>
            </a>

            {/* Divider Line */}
            <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

            {/* Counselors - Ultra Minimal */}
            <div>
              <h3 className="text-lg font-bold text-[#110053] uppercase tracking-wider mb-6">Our Counselors</h3>
              
              <div className="space-y-8">
                {/* Counselor 1 */}
                <div className="group relative pl-6 border-l-2 border-transparent hover:border-[#8b7ae8] transition-colors">
                  <div className="absolute left-[-5px] top-0 w-2 h-2 bg-[#8b7ae8] rounded-full"></div>
                  <div className="font-bold text-[#110053] text-xl mb-1">Dr. Sita Sharma</div>
                  <div className="text-[#8b7ae8] text-sm font-medium mb-2">Senior Counselor</div>
                  <div className="text-[#4a4560] text-sm">Australia • UK • Canada</div>
                </div>

                {/* Counselor 2 */}
                <div className="group relative pl-6 border-l-2 border-transparent hover:border-[#8b7ae8] transition-colors">
                  <div className="absolute left-[-5px] top-0 w-2 h-2 bg-[#8b7ae8] rounded-full"></div>
                  <div className="font-bold text-[#110053] text-xl mb-1">Mr. Ravi K.C.</div>
                  <div className="text-[#8b7ae8] text-sm font-medium mb-2">Education Counselor</div>
                  <div className="text-[#4a4560] text-sm">USA • Japan • Korea</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - ENROLLMENT FORM */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-[#e5e0ff]">
              <div className="mb-8">
                <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#9ca3af] mb-3">
                  Enroll Now
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-[#110053] mb-3">
                  Book Your Spot in Our Classes
                </h2>
                <p className="text-sm text-[#4a4560]">
                  Fill out the form below and we'll contact you within 24 hours with batch details and payment information.
                </p>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-[#110053] mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 border-b-2 ${
                      formik.touched.fullName && formik.errors.fullName
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:border-[#8b7ae8] outline-none transition-[border-color] duration-200 ease-in-out bg-transparent`}
                  />
                  {formik.touched.fullName && formik.errors.fullName && (
                    <p className="mt-1 text-xs text-red-500">{formik.errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-[#110053] mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="your@email.com"
                    className={`w-full px-4 py-3 border-b-2 ${
                      formik.touched.email && formik.errors.email
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:border-[#8b7ae8] outline-none transition-[border-color] duration-200 ease-in-out bg-transparent`}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-[#110053] mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="+977-XXXXXXXXXX"
                    className={`w-full px-4 py-3 border-b-2 ${
                      formik.touched.phone && formik.errors.phone
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:border-[#8b7ae8] outline-none transition-[border-color] duration-200 ease-in-out bg-transparent`}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <p className="mt-1 text-xs text-red-500">{formik.errors.phone}</p>
                  )}
                </div>

                {/* Course Interest */}
                <div>
                  <label className="block text-sm font-medium text-[#110053] mb-2">
                    Course <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="courseInterest"
                    value={formik.values.courseInterest}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full px-4 py-3 border-b-2 ${
                      formik.touched.courseInterest && formik.errors.courseInterest
                        ? 'border-red-500'
                        : 'border-gray-200'
                    } focus:border-[#8b7ae8] outline-none transition-[border-color] duration-200 ease-in-out bg-transparent`}
                  >
                    <option value="">Select a course</option>
                    <option>IELTS Preparation</option>
                    <option>PTE Coaching</option>
                    <option>GRE Preparation</option>
                    <option>GMAT Preparation</option>
                    <option>Japanese Language (JLPT)</option>
                    <option>Korean Language (TOPIK)</option>
                    <option>Study Materials Only</option>
                  </select>
                  {formik.touched.courseInterest && formik.errors.courseInterest && (
                    <p className="mt-1 text-xs text-red-500">{formik.errors.courseInterest}</p>
                  )}
                </div>

                {/* Preferred Batch */}
                <div>
                  <label className="block text-sm font-medium text-[#110053] mb-2">
                    Preferred Batch
                  </label>
                  <select
                    name="preferredBatch"
                    value={formik.values.preferredBatch}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#8b7ae8] outline-none transition-[border-color] duration-200 ease-in-out bg-transparent"
                  >
                    <option value="">Select timing</option>
                    <option>Morning (6-8 AM)</option>
                    <option>Day (10 AM-12 PM)</option>
                    <option>Evening (5-7 PM)</option>
                    <option>Weekend Only</option>
                  </select>
                </div>

                {/* Current Level */}
                <div>
                  <label className="block text-sm font-medium text-[#110053] mb-2">
                    Your Level
                  </label>
                  <select
                    name="currentLevel"
                    value={formik.values.currentLevel}
                    onChange={formik.handleChange}
                    className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#8b7ae8] outline-none transition-[border-color] duration-200 ease-in-out bg-transparent"
                  >
                    <option value="">Select level</option>
                    <option>Complete Beginner</option>
                    <option>Basic Understanding</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>Previously Attempted</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-[#110053] mb-2">
                    Message (Optional)
                  </label>
                  <textarea
                    name="message"
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    rows={4}
                    placeholder="Any questions?"
                    className="w-full px-4 py-3 border-b-2 border-gray-200 focus:border-[#8b7ae8] outline-none transition-[border-color] duration-200 ease-in-out bg-transparent resize-none"
                  />
                </div>

                {/* Consent */}
                <div>
                 
                  {formik.touched.consent && formik.errors.consent && (
                    <p className="mt-1 text-xs text-red-500">{formik.errors.consent}</p>
                  )}
                </div>

                {/* Status Message */}
                {status.message && (
                  <div
                    className={`p-4 rounded-lg text-sm ${
                      status.success
                        ? 'bg-green-50 text-green-700 border-l-4 border-green-400'
                        : 'bg-amber-50 text-amber-700 border-l-4 border-amber-400'
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                {/* Submit Button */}
               <button
  type="submit"
  disabled={status.loading || !formik.isValid}
  className="w-full rounded-xl bg-[#110053] text-white text-sm font-semibold py-4 
             shadow-sm shadow-black/30 
             transition-all duration-150 ease-out 
             hover:bg-gradient-to-r hover:bg-[#110053] cursor-pointer
             hover:shadow-md hover:-translate-y-[1px] 
             active:translate-y-0 
             disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm"
>
  {status.loading ? 'Submitting...' : 'Submit Enrollment Request'}
</button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
