const MapComponent = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.8689123167514!2d72.54469197435276!3d23.065267014735397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8366d36bf32d%3A0xa2bacf5b483f4019!2sMSP%20Print%20Pack!5e0!3m2!1sen!2sin!4v1770182931447!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0, minHeight: "500px" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="MSP Print Pack Location"
    />
  );
};

export default MapComponent;
