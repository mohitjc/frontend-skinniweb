const AuthLayout = ({ children }: any) => {
  return (
    <>
      <div className="relative">
        <div className="">
          <div className="mainauth bg-cover bg-no-repeat">
            <div className="bg_div bg-[#00000085] p-3">
            <div className="">{children}</div>
            </div>
          </div>
          <div className="bg-[#ffd6b6] p-[1rem] text-[#5a5c5b]">
            <p className="text-[12px] font-[600]">Skinii Corp.™ is a patient management platform that partners with independent physicians and practitioners who provide 
              services through the Skinii Patient Engagement Platform. Skinii Corp. does not directly offer medical or pharmacy services,
               and payment does not guarantee the writing or dispensing of a prescription. Medical services are delivered by independent 
               providers and Open Loop. Licensed U.S. fulfillment pharmacy services are provided by Red Rock Pharmacy, located at 450 900 
               E #150 Salt Lake City UT 84102. The information on this website is for informational purposes only and is not a 
               substitute for professional medical advice, diagnosis, or treatment. If you have questions or concerns about your health,
                please consult your doctor. This site is an advertisement for services, not for any specific medication.</p>
                <div className="flex justify-center items-center mt-[5px] flex-wrap gap-3">
                  <p>support@skinii.com</p>
                   | 
                  <p>Legal Notice</p>
                  | 
                  <p>Privacy </p>
                </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
