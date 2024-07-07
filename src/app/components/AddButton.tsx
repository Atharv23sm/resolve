function AddButton({loading,ip,handleClick}:{loading:boolean,ip:string,handleClick:any}) {
  return (
    <button
      disabled={loading || ip === ""}
      className="addButton disabled:bg-[#555] disabled:text-[#888] hover:bg-[#75f] hover:border-white"
      onClick={handleClick}
    >
      Add
    </button>
  );
}

export default AddButton;
