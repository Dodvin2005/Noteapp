import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen m-5">
      <div className="md:grid grid-cols-2">
        <div>
          <h1 className="text-4xl text-green-400 font-bold">
            Note Hub
          </h1>

          <h2 className="text-2xl text-green-300">
            Capture your thoughts...
          </h2>

          <p className="text-justify">
            A note-taking application is a versatile digital workspace designed
            to capture, organize, and retrieve information. It allows you to
            quickly jot down text, create checklists, and store multimedia.
            With cloud synchronization, your ideas are securely accessible
            across your devices, making it the perfect tool to boost
            productivity on the go.
          </p>
        </div>

        <div>
          <Image width={400} height={400} src={"/landing.gif"} alt="Landing Image" />
        </div>
      </div>
    </div>
  );
}