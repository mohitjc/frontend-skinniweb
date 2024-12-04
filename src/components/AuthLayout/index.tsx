const AuthLayout = ({ children }: any) => {
  return (
    <>
      <div className="relative">
        <div className="absolute top-[10px] left-[10px]">
          <img className="w-[130px]" src="assets/img/logo.png"></img>
        </div>
        <div className="grid grid-cols-12 items-center gap-4 ">
          <div className="col-span-6">
            <div className="  ">{children}</div>
          </div>
          <div className="col-span-6">
            <img
              className="h-screen w-full object-cover	"
              src="assets/img/login.jpg"
            ></img>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
