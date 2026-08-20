"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState("");
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormMessage("");
    setFormError("");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setFormError(data.message || "Failed to send message");
        return;
      }

      setFormMessage(data.message);

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Contact form error:", error);
      setFormError("Unable to connect to the server");
    }
  };
  return (
    <>
      <Navbar />

      <main className="bg-[#faf7f6]">
        {/* Hero */}
        {/* <section className="bg-[#f5e5e3] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-5xl text-center">

            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.4em] text-[#9b7777]">
              Contact LUMÉRA
            </p>

            <h1 className="text-5xl font-medium leading-tight text-[#4b3838] md:text-7xl">
              We'd love to
              <span className="block font-normal italic">
                hear from you.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#8f7a7a]">
              Have a question, need help with an order, or simply want to
              connect with us? Our team is always happy to hear from you.
            </p>

            <div className="mx-auto mt-10 h-px w-16 bg-[#c9aaa8]" />

          </div>
        </section> */}
        <section className="relative overflow-hidden bg-[#f5e5e3] py-24">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className=" text-sm font-medium uppercase tracking-[0.35em] text-[#9b7777]">
              Get in Touch
            </p>

            <h1 className="text-5xl font-semibold leading-tight text-[#4b3838] md:text-6xl">
              Contact Us
            </h1>

            <p className="mx-auto mt-3 max-w-2xl leading-8 text-[#6f5a5a]">
              Whether you have a question about a product, your order, or simply
              want to say hello, we'd love to hear from you.
            </p>

            <div className="mx-auto mt-10 h-px max-w-xs bg-[#dcc1bf]" />
          </div>
        </section>

        {/* Contact Area */}
        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2rem] border border-[#eadbd9] bg-white shadow-[0_15px_50px_rgba(75,56,56,0.06)] md:grid-cols-5">
            {/* Left Information */}
            <div className="bg-[#f1dfdd] p-8 md:col-span-2 md:p-12">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-[#9b7777]">
                Get in touch
              </p>

              <h2 className="text-3xl font-medium leading-snug text-[#4b3838] md:text-4xl">
                Let's make
                <span className="block italic font-normal">
                  beauty personal.
                </span>
              </h2>

              <p className="mt-6 text-sm leading-7 text-[#806b6b]">
                We're here to make your experience with LUMÉRA as beautiful and
                effortless as possible.
              </p>

              {/* Contact Details */}
              <div className="mt-12 space-y-8">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d3b5b2]">
                    <Mail
                      className="h-4 w-4 text-[#9b7777]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#9b7777]">
                      Email
                    </p>
                    <p className="mt-1 text-sm text-[#5f4b4b]">
                      hello@lumera.com
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d3b5b2]">
                    <MapPin
                      className="h-4 w-4 text-[#9b7777]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#9b7777]">
                      Visit us
                    </p>
                    <p className="mt-1 text-sm text-[#5f4b4b]">
                      Faisalabad, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d3b5b2]">
                    <Clock
                      className="h-4 w-4 text-[#9b7777]"
                      strokeWidth={1.5}
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#9b7777]">
                      Hours
                    </p>
                    <p className="mt-1 text-sm text-[#5f4b4b]">
                      Mon — Sat, 10am — 6pm
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-14 border-t border-[#d9bfbc] pt-6">
                <p className="text-xs leading-6 text-[#8b7575]">
                  We usually respond within 24 Hours.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="p-8 md:col-span-3 md:p-12 lg:p-14">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-[#9b7777]">
                Send a message
              </p>

              <h2 className="text-3xl font-medium text-[#4b3838]">
                How can we help?
              </h2>

              <form
                onSubmit={handleSubmit}
                className="mt-10 grid gap-x-8 gap-y-7 md:grid-cols-2"
              >
                {/* First Name */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#9b7777]">
                    First Name <span className="text-[#b56f6f]">*</span>
                  </label>

                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your first name"
                    required
                    // className="w-full border-b border-[#dcc1bf] bg-transparent px-0 py-3 text-sm text-[#4b3838] placeholder:text-[#b09c9c] outline-none transition focus:border-[#9b7777]"
                    className="w-full rounded-xl border border-[#dcc1bf] bg-white px-4 py-3 text-sm text-[#4b3838] outline-none transition focus:border-[#9b7777] focus:ring-1 focus:ring-[#9b7777]"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#9b7777]">
                    Last Name <span className="text-[#b56f6f]">*</span>
                  </label>

                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your last name"
                    required
                    // className="w-full border-b border-[#dcc1bf] bg-transparent px-0 py-3 text-sm text-[#4b3838] placeholder:text-[#b09c9c] outline-none transition focus:border-[#9b7777]"
                    className="w-full rounded-xl border border-[#dcc1bf] bg-white px-4 py-3 text-sm text-[#4b3838] outline-none transition focus:border-[#9b7777] focus:ring-1 focus:ring-[#9b7777]"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#9b7777]">
                    Email Address <span className="text-[#b56f6f]">*</span>
                  </label>

                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="you@example.com"
                    required
                    // className="w-full border-b border-[#dcc1bf] bg-transparent px-0 py-3 text-sm text-[#4b3838] placeholder:text-[#b09c9c] outline-none transition focus:border-[#9b7777]"
                    className="w-full rounded-xl border border-[#dcc1bf] bg-white px-4 py-3 text-sm text-[#4b3838] outline-none transition focus:border-[#9b7777] focus:ring-1 focus:ring-[#9b7777]"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#9b7777]">
                    Subject <span className="text-[#b56f6f]">*</span>
                  </label>

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-[#dcc1bf] bg-white px-4 py-3 text-sm text-[#4b3838] outline-none transition focus:border-[#9b7777] focus:ring-1 focus:ring-[#9b7777]"
                    required
                  >
                    <option value="" disabled>
                      Select a subject
                    </option>

                    <option value="general">General Inquiry</option>
                    <option value="order">Order Status & Tracking</option>
                    <option value="returns">Returns & Exchanges</option>
                    <option value="feedback">Product Feedback</option>
                  </select>
                </div>

                {/* Message */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-bold uppercase tracking-[0.15em] text-[#9b7777]">
                    Your Message <span className="text-[#b56f6f]">*</span>
                  </label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us how we can help..."
                    required
                    // className="w-full resize-none border-b border-[#dcc1bf] bg-transparent px-0 py-3 text-sm text-[#4b3838] placeholder:text-[#b09c9c] outline-none transition focus:border-[#9b7777]"
                    className="w-full rounded-xl border border-[#dcc1bf] bg-white px-4 py-3 text-sm text-[#4b3838] outline-none transition focus:border-[#9b7777] focus:ring-1 focus:ring-[#9b7777]"
                  />
                </div>
                {formError && (
                  <p className="md:col-span-2 text-sm text-red-600">
                    {formError}
                  </p>
                )}

                {formMessage && (
                  <p className="md:col-span-2 text-sm text-green-600">
                    {formMessage}
                  </p>
                )}
                {/* Button */}
                <div className="pt-2 md:col-span-2">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#4b3838] px-8 py-3.5 text-xs font-semibold tracking-[0.15em] text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#6f5a5a] hover:shadow-lg"
                  >
                    SEND MESSAGE
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
        {/* FAQ */}
        <section className="border-t border-[#e5d6d3] bg-[#faf7f5] px-6 py-24 md:py-28">
          <div className="mx-auto max-w-4xl">
            <div className="mb-14 text-center">
              <h1 className="text-5xl font-semibold font-medium text-[#4b3838] ">
                FAQs
              </h1>

              <p className="mx-auto mt-5 max-w-xl leading-7 text-[#8f7a7a]">
                Everything you need to know about LUMÉRA, our products, and your
                order.
              </p>
            </div>

            <div className="border-t border-[#dcc1bf]">
              {/* FAQ 1 */}
              <div className="border-b border-[#dcc1bf]">
                <button
                  onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                  className="flex w-full items-center justify-between py-6 text-left"
                >
                  <span className="text-base font-medium text-[#4b3838] md:text-lg">
                    How can I track my order?
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#9b7777] transition-transform duration-300 ${
                      openFaq === 0 ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    openFaq === 0
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-6 pr-10 leading-7 text-[#8f7a7a]">
                      Once your order has been shipped, you'll receive tracking
                      information through your email.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 2 */}
              <div className="border-b border-[#dcc1bf]">
                <button
                  onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                  className="flex w-full items-center justify-between py-6 text-left"
                >
                  <span className="text-base font-medium text-[#4b3838] md:text-lg">
                    How long does delivery take?
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#9b7777] transition-transform duration-300 ${
                      openFaq === 1 ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    openFaq === 1
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-6 pr-10 leading-7 text-[#8f7a7a]">
                      Orders are typically delivered within 3–5 business days.
                      Delivery times may vary depending on your location.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 3 */}
              <div className="border-b border-[#dcc1bf]">
                <button
                  onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  className="flex w-full items-center justify-between py-6 text-left"
                >
                  <span className="text-base font-medium text-[#4b3838] md:text-lg">
                    Can I return or exchange a product?
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#9b7777] transition-transform duration-300 ${
                      openFaq === 2 ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    openFaq === 2
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-6 pr-10 leading-7 text-[#8f7a7a]">
                      Yes. Eligible products can be returned or exchanged
                      according to our return policy. Please contact our support
                      team for assistance.
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ 4 */}
              <div className="border-b border-[#dcc1bf]">
                <button
                  onClick={() => setOpenFaq(openFaq === 3 ? null : 3)}
                  className="flex w-full items-center justify-between py-6 text-left"
                >
                  <span className="text-base font-medium text-[#4b3838] md:text-lg">
                    How can I contact LUMÉRA?
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#9b7777] transition-transform duration-300 ${
                      openFaq === 3 ? "rotate-180" : ""
                    }`}
                    strokeWidth={1.5}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ${
                    openFaq === 3
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-3xl pb-6 pr-10 leading-7 text-[#8f7a7a]">
                      You can reach us through the contact form above or email
                      us directly at hello@lumera.com. Our team will be happy to
                      help.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
