# Backup and Recovery Strategy

## 1. Primary Source of Truth
The GitHub repository is the absolute source of truth. As long as GitHub is operational, the site can be recovered in minutes.
- **Backup Action:** GitHub inherently provides geographical redundancy for Git repositories.
- **Local Backup:** Developers must maintain local `git clone` copies of the `main` branch.

## 2. CI/CD Recovery (Netlify Failure)
If Netlify terminates the account or suffers a catastrophic outage:
1. Create a GitHub Pages environment or Cloudflare Pages project.
2. Point the new provider to the GitHub repository.
3. Update DNS CNAME records to point to the new provider.
4. Total Recovery Time Objective (RTO): < 30 minutes.

## 3. Domain Recovery
- Domain registrar access must be secured with a hardware security key (YubiKey) or strong TOTP 2FA to prevent hijacking.
- Domain auto-renew MUST be enabled with a corporate credit card.

## 4. Disaster Recovery Drill
Annually, the DevOps team will:
1. Clone the repo to a local machine.
2. Run `npm install` and `npm run build`.
3. Manually deploy the `dist` folder to a secondary provider (e.g., Vercel) to verify portability.
