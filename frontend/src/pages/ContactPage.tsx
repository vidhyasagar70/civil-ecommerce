import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import './ContactPage.css';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit contact form');
      }

      return response.json();
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Success!',
        text: 'Your message has been sent successfully. We will get back to you soon!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    },
    onError: (error: any) => {
      Swal.fire({
        title: 'Error!',
        text: error.message || 'Failed to send message. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formData);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Please fill out the form below.</p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-section">
              <h3>Call to Us:</h3>
              <p>We're available 24/7, 7 days a week.</p>
              <p className="highlight">+918807423228</p>
            </div>

            <div className="info-section">
              <h3>Write to Us:</h3>
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p className="highlight">Civildigitalstore@gmail.com</p>
            </div>

            <div className="info-section">
              <h3>Headquarter:</h3>
              <p>Monday - Friday: 9:00-20:00</p>
              <p>Saturday: 11:00 - 15:00</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What is this regarding?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message (Optional)</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={contactMutation.isPending}
            >
              {contactMutation.isPending ? 'Sending...' : 'SUBMIT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;