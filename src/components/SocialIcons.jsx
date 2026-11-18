import React from 'react';
import { FaGithub, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';

/**
 * Ícones de redes sociais utilizando Font Awesome 6 do React Icons
 * (GitHub, LinkedIn, Instagram, X/Twitter)
 */
export const GithubIcon = ({ className = "w-4 h-4", ...props }) => (
  <FaGithub className={`inline-block shrink-0 ${className}`} {...props} />
);

export const LinkedinIcon = ({ className = "w-4 h-4", ...props }) => (
  <FaLinkedinIn className={`inline-block shrink-0 ${className}`} {...props} />
);

export const InstagramIcon = ({ className = "w-4 h-4", ...props }) => (
  <FaInstagram className={`inline-block shrink-0 ${className}`} {...props} />
);

export const XIcon = ({ className = "w-4 h-4", ...props }) => (
  <FaXTwitter className={`inline-block shrink-0 ${className}`} {...props} />
);
