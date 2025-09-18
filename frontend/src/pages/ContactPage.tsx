import React, { useState } from 'react';
import { useSubmitContactForm } from '../api/contactApi';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
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

  const submitContactForm = useSubmitContactForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitContactForm.mutate(formData, {
      onSuccess: () => {
        // Reset form on success
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    });
  };

  // Google Maps iframe embed code (replace with your actual location)
  const googleMapsEmbedUrl = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d250875.31940063165!2d79.082117!3d10.74012!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baabee185555555%3A0xcbb0bd1ecb02b6ec!2sCivil%20DigitalStore!5e0!3m2!1sen!2sin!4v1758196477578!5m2!1sen!2sin";

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-header">
          <h1>Contact Us</h1>
          <p>We'd love to hear from you. Please fill out the form below or visit our headquarters.</p>
        </div>

        <div className="contact-content">
          {/* Left side - Contact Information and Map */}
          <div className="contact-info-section">
            <div className="contact-info">
              <div className="info-section">
                <div className="info-icon">
                  <Phone size={20} />
                </div>
                <div>
                  <h3>Call to Us:</h3>
                  <p>We're available 24/7, 7 days a week.</p>
                  <p className="highlight">+918807423228</p>
                </div>
              </div>

              <div className="info-section">
                <div className="info-icon">
                  <Mail size={20} />
                </div>
                <div>
                  <h3>Write to Us:</h3>
                  <p>Fill out our form and we will contact you within 24 hours.</p>
                  <p className="highlight">Civildigitalstore@gmail.com</p>
                </div>
              </div>

              <div className="info-section">
                <div className="info-icon">
                  <Clock size={20} />
                </div>
                <div>
                  <h3>Business Hours:</h3>
                  <p>Monday - Friday: 9:00-20:00</p>
                  <p>Saturday: 11:00 - 15:00</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>

              <div className="info-section">
                <div className="info-icon">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3>Headquarters Address:</h3>
                  <p>Civil Digital Store</p>
                  <p>Thanjavur, Tamilnadu</p>
                  <p>India</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
           
          </div>

          {/* Right side - Contact Form */}
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
                  disabled={submitContactForm.isPending}
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
                  disabled={submitContactForm.isPending}
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
                disabled={submitContactForm.isPending}
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
                disabled={submitContactForm.isPending}
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button 
              type="submit" 
              className="submit-btn"
              disabled={submitContactForm.isPending}
            >
              {submitContactForm.isPending ? (
                <>
                  <span className="spinner"></span>
                  Sending...
                </>
              ) : (
                'SUBMIT MESSAGE'
              )}
            </button>
          </form>
          
        </div>
         <div className="map-section">
              <div className="map-container">
                <iframe
                  src={googleMapsEmbedUrl}
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Civil Digital Store Location"
                />
              </div>
              <div className="map-actions">
                <a
                  href="https://maps.app.goo.gl/UsepnwEqHCPHX3JY7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-link"
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