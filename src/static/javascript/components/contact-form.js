// Textarea max character count

if (document.querySelector(".main-join")) {
  const textarea = document.querySelector(".input--textarea");
  const nestedLabel = document.querySelector(".nested-label");
  const maxLength = textarea?.maxLength;

  const updateCharCount = () => {
    const remaining = maxLength - textarea.value.length;
    nestedLabel.textContent =
      remaining === maxLength
        ? `Max — ${maxLength} characters`
        : `${remaining} character${remaining === 1 ? "" : "s"} remaining`;

    // nestedLabel.classList.toggle("text-error", remaining === 0);
  };

  if (maxLength) {
    updateCharCount();
    textarea?.addEventListener("input", updateCharCount);
  }
}
