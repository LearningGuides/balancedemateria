interface FormulaProps {
  latex: string;
}

export default function Formula({ latex }: FormulaProps) {
  return (
    <div className="formula">
      {String.raw`\[${latex}\]`}

      <style>{`
        .formula {
          margin: 10px 0;
          padding: 10px;
          overflow-x: auto;
          background: #f8f8f8;
          border-left: 4px solid #007acc;
        }
      `}</style>
    </div>
  );
}