import { useUserAuth } from '../../context/AuthContext';

const LandingPage = () => {
  const { setShowRegisterModal } = useUserAuth();

  return (
    <>
      <div className="tw-h-full tw-w-screen tw-bg-gray md:tw-max-w-7xl md:tw-mx-auto tw-py-2">
        <div className="tw-p-20 tw-m-4 tw-relative tw-m-1 tw-bg-center tw-bg-no-repeat tw-bg-bar-backdrop tw-text-white tw-text-center tw-text-4xl">
          <div className="tw-max-w-7xl tw-mx-auto tw-px-4">
            <h1 className="">COVID Sucks.</h1>
            <h1>Be responsible.</h1>
            <h1>Drink at home.</h1>
          </div>
        </div>
        <hr className="tw-border-white" />
        <div className="tw-py-12 tw-bg-gray-light tw-max-w-7xl tw-mx-auto">
          <div className="md:tw-max-w-7xl md:tw-mx-auto tw-px-4">
            <div className="lg:tw-text-center">
              <p className="tw-mt-2 tw-text-3xl tw-leading-8 tw-font-extrabold tw-tracking-tight tw-text-black">A more responsible way to drink.</p>
              <p className="tw-mt-4 tw-max-w-2xl tw-text-xl tw-text-asphalt-subtle lg:tw-mx-auto">Here at The Juice Box, we believe that there's a safer way to spend the evenings. We hope you enjoy the Fruits of our Labor.</p>
            </div>

            <div className="tw-mt-10">
              <dl className="tw-space-y-10 md:tw-space-y-0 md:tw-grid md:tw-grid-cols-2 md:tw-gap-x-8 md:tw-gap-y-10">
                <div className="tw-flex">
                  <div className="tw-ml-4">
                    <dt className="tw-text-lg tw-leading-6 tw-font-medium tw-text-gray-dark">Fantastically Fruity Wine Selections</dt>
                    <dd className="tw-mt-2 tw-text-base tw-text-black">We have the best fruit wines to choose from.</dd>
                  </div>
                </div>
                <div className="tw-flex">
                  <div className="tw-ml-4">
                    <dt className="tw-text-lg tw-leading-6 tw-font-medium tw-text-gray-dark">Bombastic Brewed Beers</dt>
                    <dd className="tw-mt-2 tw-text-base tw-text-black">You just have to try them out.</dd>
                  </div>
                </div>
                <div className="tw-flex">
                  <div className="tw-ml-4">
                    <dt className="tw-text-lg tw-leading-6 tw-font-medium tw-text-gray-dark">Best In Class Venues</dt>
                    <dd className="tw-mt-2 tw-text-base tw-text-black">Find the best places (in your home) to drink your drinks.</dd>
                  </div>
                </div>
                <div className="tw-flex">
                  <div className="tw-ml-4">
                    <dt className="tw-text-lg tw-leading-6 tw-font-medium tw-text-gray-dark">"Amazing. Just simply amazing." - Not The New York Times, 2020</dt>
                    <dd className="tw-mt-2 tw-text-base tw-text-black">Even they think we're pretty awesome.</dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
        <hr className="tw-border-white" />
        <div className="tw-p-8 tw-flex tw-flex-col tw-items-center">
          <h2 className="tw-text-5xl tw-text-asphalt">Well what are you waiting for? Sign Up now!</h2>
          <button onClick={() => setShowRegisterModal(true)} className="tw-text-3xl tw-my-8 tw-border tw-bg-green hover:tw-bg-green-dark tw-p-2 tw-rounded">Sign Up</button>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
