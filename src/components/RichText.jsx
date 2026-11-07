function formatInlineText(text) {
  return String(text || "")
    .split(/(\*[^*]+\*|_[^_]+_)/g)
    .map((part, index) => {
      if (part.startsWith("*_") && part.endsWith("_*")) {
        return (
          <strong key={index}>
            <em>{part.slice(2, -2)}</em>
          </strong>
        );
      }

      if (part.startsWith("*") && part.endsWith("*")) {
        return <strong key={index}>{part.slice(1, -1)}</strong>;
      }

      if (part.startsWith("_") && part.endsWith("_")) {
        return <em key={index}>{part.slice(1, -1)}</em>;
      }

      return part;
    });
}

export function FormattedText({ children }) {
  return String(children || "")
    .split(/(\r?\n)/g)
    .map((part, index) =>
      /^\r?\n$/.test(part) ? <br key={index} /> : formatInlineText(part),
    );
}
