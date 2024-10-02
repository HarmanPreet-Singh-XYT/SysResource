import Link from 'next/link'
import React from 'react'

const Unsupported = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="container mx-auto">
        {/* Unsupported Platforms Section */}
        <section id="unsupported-platforms" className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Unsupported Platforms
          </h2>

          <p className="text-gray-700 mb-4">
            Currently, our docs may not support all platforms code. However, we expect to include more platforms
            and extend compatibility to more platforms in the
            future. If you need support for a specific platform, feel free to
            reach out to us or contribute to the project!
          </p>

          <div className="bg-gray-800 text-white p-4 rounded mb-4">
            <h3 className="text-lg font-bold mb-2">Request Support</h3>
            <p>
              If you have a specific platform in mind that you&apos;d like to see
              supported, you can contact us at{" "}
              <a
                href="mailto:harmanpreetsingh@programmer.net"
                className="underline text-blue-400"
              >
                harmanpreetsingh@programmer.net
              </a>
              . We&apos;ll do our best to prioritize support for it in future
              updates.
            </p>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded mb-4">
            <h3 className="text-lg font-bold mb-2">Contribute Code</h3>
            <p>
              You can also contribute backend code yourself! If you are
              comfortable coding for a platform like Rust, Go, or any other
              language not currently supported, you are welcome to submit your
              code for review. Simply email your code to{" "}
              <a
                href="mailto:harmanpreetsingh@programmer.net"
                className="underline text-blue-400"
              >
                harmanpreetsingh@programmer.net
              </a>{" "}
              or contribute via our <Link href={'https://github.com/HarmanPreet-Singh-XYT/SysResource'} className='text-blue-400 underline'>Github Repository</Link>.
            </p>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded">
            <h3 className="text-lg font-bold mb-2">Use AI for Code Conversion</h3>
            <p>
              For developers wanting to support a different platform (e.g., Rust
              or Go), you can also use AI tools to help convert our existing
              backend code. These tools can assist in generating platform-specific
              implementations faster and more efficiently.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Unsupported