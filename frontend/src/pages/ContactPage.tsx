import React, { useState } from "react";
import { useSubmitContactForm } from "../api/contactApi";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const submitContactForm = useSubmitContactForm();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContactForm.mutate(formData, {
      onSuccess: () => {
        setFormData({ name: "", email: "", subject: "", message: "" });
      },
    });
  };

  const googleMapsEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d250875.31940063165!2d79.082117!3d10.74012!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baabee185555555%3A0xcbb0bd1ecb02b6ec!2sCivil%20DigitalStore!5e0!3m2!1sen!2sin!4v1758196477578!5m2!1sen!2sin";

  return (
    <div className="min-h-[calc(100vh-120px)] bg-gradient-to-br from-gray-100 to-indigo-100 p-6 md:p-10">
      <div className="mx-auto max-w-6xl rounded-xl bg-white shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-10 text-center text-white">
          <h1 className="mb-2 text-3xl md:text-4xl font-bold">Contact Us</h1>
          <p className="mx-auto max-w-xl opacity-90">
            We'd love to hear from you. Please fill out the form below or visit
            our headquarters.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-10">
          {/* Left side - Info */}
          <div className="space-y-6">
            <div className="space-y-5">
              {/* Phone */}
              <div className="flex gap-4 rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500 text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Call to Us:
                  </h3>
                  <p className="text-gray-600">
                    We're available 24/7, 7 days a week.
                  </p>
                  <p className="font-semibold text-indigo-600">
                    +918807423228
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4 rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500 text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Write to Us:
                  </h3>
                  <p className="text-gray-600">
                    Fill out our form and we will contact you within 24 hours.
                  </p>
                  <p className="font-semibold text-indigo-600">
                    Civildigitalstore@gmail.com
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex gap-4 rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500 text-white">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Business Hours:
                  </h3>
                  <p className="text-gray-600">Monday - Friday: 9:00-20:00</p>
                  <p className="text-gray-600">Saturday: 11:00 - 15:00</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex gap-4 rounded-lg border-l-4 border-indigo-500 bg-gray-50 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-500 text-white">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Headquarters Address:
                  </h3>
                  <p className="text-gray-600">Civil Digital Store</p>
                  <p className="text-gray-600">Thanjavur, Tamilnadu</p>
                  <p className="text-gray-600">India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={submitContactForm.isPending}
                  placeholder="Enter your full name"
                  className="rounded-lg border-2 border-gray-200 px-4 py-2 text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Your Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={submitContactForm.isPending}
                  placeholder="Enter your email address"
                  className="rounded-lg border-2 border-gray-200 px-4 py-2 text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-70"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Subject *
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                disabled={submitContactForm.isPending}
                placeholder="What is this regarding?"
                className="rounded-lg border-2 border-gray-200 px-4 py-2 text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700">
                Your Message (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                disabled={submitContactForm.isPending}
                placeholder="Tell us more about your inquiry..."
                className="rounded-lg border-2 border-gray-200 px-4 py-2 text-gray-800 focus:border-indigo-500 focus:ring focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-70"
              />
            </div>

            <button
              type="submit"
              disabled={submitContactForm.isPending}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-3 font-semibold text-white transition hover:shadow-lg hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitContactForm.isPending ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  Sending...
                </>
              ) : (
                "SUBMIT MESSAGE"
              )}
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="mx-auto my-6 w-11/12 rounded-lg bg-gray-50 p-5 shadow-md">
          <div className="overflow-hidden rounded-lg shadow">
            <iframe
              src={googleMapsEmbedUrl}
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Civil Digital Store Location"
              className="rounded-lg"
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href="https://maps.app.goo.gl/UsepnwEqHCPHX3JY7"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-indigo-500 px-5 py-2 font-medium text-white transition hover:bg-indigo-600"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
