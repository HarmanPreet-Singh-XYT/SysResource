import React from 'react'

const Contribution = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        {/* Contributing Section */}
        <section id="contributing" className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Contributing to the Project
          </h2>

          <p className="text-gray-700 mb-4">
            We&apos;re always open to community contributions! If you&apos;d like to help
            extend platform support or improve the project, here&apos;s how you can
            contribute:
          </p>

          {/* Contribute via GitHub */}
          <div className="bg-gray-800 text-white p-4 rounded mb-4">
            <h3 className="text-lg font-bold mb-2">Contribute via GitHub</h3>
            <p>
              If you&apos;d like to contribute via GitHub, follow these steps:
            </p>
            <ul className="list-disc list-inside text-gray-300 mb-2">
              <li>
                Clone the repository and create a new folder under{" "}
                <code>/components/Documentation/</code>.
              </li>
              <li>
                Inside this folder, create a subfolder with the name of the
                programming language you&apos;re contributing (e.g.,{" "}
                <code>/components/Documentation/Rust/</code>).
              </li>
              <li>
                Refer to the existing TypeScript file as a template to ensure
                your contribution follows the same format.
              </li>
              <li>
                Once done, submit a pull request for review. You can also check
                out the link to the repository here:{" "}
                <a
                  href="https://github.com/HarmanPreet-Singh-XYT/SysResource"
                  className="underline text-blue-400"
                >
                  GitHub Repository
                </a>.
              </li>
            </ul>
            <p>
              Make sure your contribution follows the existing file structure
              and conventions for consistency!
            </p>
          </div>

          {/* Contribute via Email */}
          <div className="bg-gray-800 text-white p-4 rounded mb-4">
            <h3 className="text-lg font-bold mb-2">Contribute via Email</h3>
            <p>
              You can also contribute by simply mailing your code to{" "}
              <a
                href="mailto:harmanpreetsingh@programmer.net"
                className="underline text-blue-400"
              >
                harmanpreetsingh@programmer.net
              </a>
              . Ensure that your code follows the existing formatting for easier
              review.
            </p>
          </div>

          {/* Create an Issue */}
          <div className="bg-gray-800 text-white p-4 rounded">
            <h3 className="text-lg font-bold mb-2">Create an Issue on GitHub</h3>
            <p>
              If you&apos;d like to propose a change or submit code without
              committing directly, you can also create an issue on GitHub. When
              creating an issue, you can include your code directly in the issue
              description, and we&apos;ll review it from there. To create an issue,
              visit the following link:{" "}
              <a
                href="https://github.com/HarmanPreet-Singh-XYT/SysResource/issues"
                className="underline text-blue-400"
              >
                Create GitHub Issue
              </a>.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Contribution