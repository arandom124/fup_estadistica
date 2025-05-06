
import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface LatexProps {
  formula: string;
  inline?: boolean;
}

const LatexRenderer: React.FC<LatexProps> = ({ formula, inline = false }) => {
  return (
    <div className="my-4">
      {inline ? (
        <InlineMath math={formula} />
      ) : (
        <BlockMath math={formula} />
      )}
    </div>
  );
};

export default LatexRenderer;
