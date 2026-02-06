const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/9123456789"
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366]"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6 fill-current"
      >
        <path d="M20.52 3.48A11.85 11.85 0 0 0 12 0C5.38 0 .02 5.36.02 11.98c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.6a12 12 0 0 0 5.8 1.48h.02c6.62 0 12-5.36 12-11.98 0-3.2-1.25-6.2-3.5-8.42ZM12.02 21.5h-.02c-1.84 0-3.65-.5-5.23-1.44l-.37-.22-3.67.95.98-3.58-.24-.37a9.52 9.52 0 0 1-1.5-5.08C1.97 6.47 6.5 1.95 12 1.95c2.5 0 4.85.98 6.62 2.76a9.3 9.3 0 0 1 2.75 6.59c0 5.5-4.5 10.2-9.35 10.2Zm5.2-7.7c-.28-.14-1.65-.82-1.9-.91-.25-.1-.43-.14-.62.14-.18.28-.71.91-.87 1.1-.16.18-.32.2-.6.07-.28-.14-1.18-.43-2.25-1.38-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.56.12-.12.28-.32.41-.48.14-.16.18-.28.28-.46.09-.18.04-.35-.02-.5-.07-.14-.62-1.5-.85-2.05-.22-.53-.44-.45-.62-.46-.16 0-.35 0-.53 0-.18 0-.5.07-.76.35-.25.28-1 1-1 2.44 0 1.44 1.03 2.83 1.18 3.02.14.18 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.62.69.22 1.32.2 1.81.12.55-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.2-.53-.34Z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
