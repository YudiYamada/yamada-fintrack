const TransactionTypeIcon = ({ icon, label }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
          {icon}
        </div>
        <p className="text-muted-foreground text-sm">{label}</p>
      </div>
    </>
  );
};

export default TransactionTypeIcon;
