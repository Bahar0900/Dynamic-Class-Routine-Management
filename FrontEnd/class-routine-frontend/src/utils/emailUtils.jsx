export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
  export const obfuscateEmail = (email) => {
    const [localPart, domain] = email.split("@");
    const obfuscatedLocal = localPart.slice(0, 2) + "***" + localPart.slice(-1);
    return `${obfuscatedLocal}@${domain}`;
  };
  
  export const sendEmail = async (email, subject, body) => {
    try {
      const response = await fetch("https://email-service.example.com/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subject, body }),
      });
      return response.ok;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  };