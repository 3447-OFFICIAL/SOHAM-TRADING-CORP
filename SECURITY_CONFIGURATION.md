# GitHub Enterprise Security Configuration

**Overview**
This repository adheres to Fortune 500 enterprise security standards. Access, code changes, and secrets management are tightly controlled via GitHub's advanced security features.

## Required Branch Protections (`main` branch)
- **Require a pull request before merging:** Enabled
  - **Require approvals:** Minimum 2 approvals
  - **Dismiss stale pull request approvals when new commits are pushed:** Enabled
  - **Require review from Code Owners:** Enabled
- **Require status checks to pass before merging:** Enabled
  - **Checks Required:** `CodeQL`, `Jest Unit Tests`, `Playwright E2E Tests`
  - **Require branches to be up to date before merging:** Enabled
- **Require signed commits:** Enabled
  - All commits must be verified via GPG, SSH, or S/MIME.
- **Do not allow bypassing the above settings:** Enabled
- **Restrict who can push to matching branches:** Locked down to Release Managers only.

## Automated Security Checks
- **Dependabot:** Configured to scan NPM, Docker, and GitHub Actions dependencies weekly.
- **CodeQL (SAST):** Scans all JavaScript logic on PR creation and weekly on `main` to catch XSS, prototype pollution, and logic flaws.
- **Secret Scanning:** GitHub Advanced Security Secret Scanning is enabled to block pushes containing AWS, GCP, Azure, or generic API keys.

## Security Advisories
All vulnerabilities discovered internally or externally will be disclosed responsibly via GitHub Security Advisories before a public CVE is filed.
