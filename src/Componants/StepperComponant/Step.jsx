const Step = ({ title, message }) => {
  return (
    <div className="step">
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};

export default Step;