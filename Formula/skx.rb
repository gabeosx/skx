class Skx < Formula
  desc "The CLI tool for managing Agent Skills"
  homepage "https://github.com/gabeosx/skx"
  url "https://registry.npmjs.org/@gabeosx/skx/-/skx-1.0.0.tgz"
  sha256 "0000000000000000000000000000000000000000000000000000000000000000" # Placeholder
  license "ISC"

  depends_on "node"

  def install
    system "npm", "install", *std_npm_args
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    # Check if the binary is executable and returns a version
    assert_match version.to_s, shell_output("#{bin}/skx --version")
  end
end
