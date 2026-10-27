import React from 'react';
import { FaGithub, FaLinkedinIn, FaInstagram, FaXTwitter } from 'react-icons/fa6';

/**
 * Ícones de redes sociais utilizando Font Awesome 6 do React Icons
 * (GitHub, LinkedIn, Instagram, X/Twitter)
 */
export const GithubIcon = ({ className = "w-4 h-4", ...props }) => (
  <FaGithub className={className} {...props} />
);

export const LinkedinIcon = ({ className = "w-4 h-4", ...props }) => (
  <FaLinkedinIn className={className} {...props} />
);

export const InstagramIcon = ({ className = "w-4 h-4", ...props }) => (
  <FaInstagram className={className} {...props} />
);

export const XIcon = ({ className = "w-4 h-4", ...props }) => (
  <FaXTwitter className={className} {...props} />
);
