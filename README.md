# MaSAT Admin Panel

Professional React admin panel for managing users, roles, and applications in the MaSAT Voice Chat platform.

## Features

- 🔐 **Secure Authentication** - AWS Cognito integration with admin-only access
- 👥 **User Management** - View, search, filter, and manage all app users
- 🛡️ **Role Management** - Change user roles with real-time updates
- 📝 **Application Review** - Approve/reject host and agency applications
- 📊 **Analytics Dashboard** - Visual insights into user statistics and role distribution
- 🎨 **Modern UI** - Built with React, Tailwind CSS, and Lucide icons

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Authentication**: AWS Amplify + Cognito
- **Database**: DynamoDB via AWS SDK
- **Charts**: Recharts
- **Icons**: Lucide React
- **Routing**: React Router v6

## Prerequisites

Before you begin, make sure you have:

1. Node.js 18+ and npm installed
2. Access to your AWS account with:
   - Cognito User Pool ID
   - DynamoDB table names
   - IAM permissions configured
3. A user with admin role in your Cognito User Pool

---

## Setup Instructions

### Step 1: Install Dependencies

```bash
cd masat-admin
npm install
```

### Step 2: Configure AWS Resources

#### A. Get Your AWS Credentials

You need to get these values from your Flutter app's Amplify configuration:

1. Open `amplify/backend/amplify-meta.json` from your Flutter project
2. Find these values:
   - User Pool ID: Look for `auth` → `userPoolId`
   - App Client ID: Look for `auth` → `appClientId`
   - Region: Usually `us-east-1`
   - DynamoDB Table Names: Look for `api` → `tableName`

#### B. Update `src/aws-config.js`

```javascript
const awsconfig = {
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_XXXXXXXXX', // Your User Pool ID
      userPoolClientId: 'XXXXXXXXXXXXXXXXXXXXXXXXXX', // Your App Client ID
      region: 'us-east-1', // Your region
      signUpVerificationMethod: 'code',
      loginWith: {
        email: true,
        username: true,
      },
    },
  },
  API: {
    GraphQL: {
      endpoint: 'https://XXXXXXXXXXXXXXXXXXXX.appsync-api.us-east-1.amazonaws.com/graphql',
      region: 'us-east-1',
      defaultAuthMode: 'userPool',
    },
  },
}
```

#### C. Update DynamoDB Table Names

In `src/services/UserService.js`:
```javascript
const TABLE_NAME = 'Users-dev' // Replace with your actual table name
```

In `src/services/ApplicationService.js`:
```javascript
const HOST_APPLICATIONS_TABLE = 'HostApplications-dev' // Replace
const AGENCY_APPLICATIONS_TABLE = 'AgencyApplications-dev' // Replace
```

### Step 3: Configure IAM Permissions

Your admin users need DynamoDB permissions. Add this policy to your Cognito User Pool authenticated role:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "dynamodb:GetItem",
        "dynamodb:Scan",
        "dynamodb:Query",
        "dynamodb:UpdateItem",
        "dynamodb:PutItem"
      ],
      "Resource": [
        "arn:aws:dynamodb:us-east-1:YOUR_ACCOUNT_ID:table/Users-dev",
        "arn:aws:dynamodb:us-east-1:YOUR_ACCOUNT_ID:table/HostApplications-dev",
        "arn:aws:dynamodb:us-east-1:YOUR_ACCOUNT_ID:table/AgencyApplications-dev"
      ]
    }
  ]
}
```

### Step 4: Create Admin User

Make sure you have at least one user with admin role in DynamoDB:

1. Sign in to AWS Console
2. Go to DynamoDB → Tables → Users-dev
3. Find your user and update the `role` field to: `admin`, `super_admin`, `manager`, or `country_head`

### Step 5: Run Development Server

```bash
npm run dev
```

The admin panel will be available at `http://localhost:3000`

---

## Deployment to AWS Amplify

### Option 1: Deploy via AWS Amplify Console (Recommended)

#### Step 1: Push Code to Git Repository

```bash
cd masat-admin
git init
git add .
git commit -m "Initial admin panel"
git remote add origin <your-git-repo-url>
git push -u origin main
```

#### Step 2: Create Amplify App

1. Go to AWS Amplify Console: https://console.aws.amazon.com/amplify
2. Click **"New app"** → **"Host web app"**
3. Connect your Git repository (GitHub, GitLab, Bitbucket, etc.)
4. Select your repository and branch (`main` or `master`)

#### Step 3: Configure Build Settings

Amplify will auto-detect Vite. Verify the build settings:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: dist
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

Click **"Next"** → **"Save and deploy"**

#### Step 4: Wait for Deployment

Amplify will:
- Install dependencies
- Build your React app
- Deploy to CloudFront CDN
- Provide you with a URL like: `https://main.d1234567890.amplifyapp.com`

### Option 2: Deploy via Amplify CLI

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure Amplify
amplify configure

# Initialize Amplify in your project
cd masat-admin
amplify init

# Add hosting
amplify add hosting

# Choose: Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)

# Publish
amplify publish
```

---

## Connect Custom Domain

### Step 1: Add Domain in Amplify Console

1. Go to your Amplify app in AWS Console
2. Click **"Domain management"** in the left sidebar
3. Click **"Add domain"**

### Step 2: Enter Your Domain

- If you bought domain from AWS Route 53: Domain will be auto-detected
- If external domain (GoDaddy, Namecheap, etc.): Enter your domain manually

Example: `yourdomain.com`

### Step 3: Configure Subdomain

Add a subdomain for admin panel:
- Subdomain: `admin`
- Full URL: `admin.yourdomain.com`

### Step 4: Update DNS Records

#### If using Route 53:
- Amplify automatically creates DNS records ✅

#### If using external DNS provider (GoDaddy, Namecheap, etc.):

Add these CNAME records to your DNS provider:

```
Type: CNAME
Name: admin
Value: <amplify-domain>.amplifyapp.com
TTL: 300
```

Example:
```
Name: admin
Type: CNAME
Value: main.d1234567890.amplifyapp.com
```

### Step 5: Wait for SSL Certificate

- Amplify will automatically provision a FREE SSL certificate via AWS Certificate Manager
- This takes 10-30 minutes
- Status will change from "Pending verification" → "Active"

### Step 6: Access Your Admin Panel

Once SSL is active, access your admin panel at:
```
https://admin.yourdomain.com
```

---

## Security Best Practices

1. **Admin Access Only**: Only users with roles `admin`, `super_admin`, `manager`, or `country_head` can access the panel

2. **HTTPS Only**: Amplify provides free SSL certificates - always use HTTPS

3. **IAM Least Privilege**: Only grant DynamoDB permissions to tables that need to be accessed

4. **Regular Audits**: Monitor CloudWatch logs for suspicious activity

5. **MFA**: Enable Multi-Factor Authentication for admin users in Cognito

---

## Troubleshooting

### Issue: "Access Denied" error when logging in

**Solution**: Make sure your user has an admin role in DynamoDB:
```
role: "admin" | "super_admin" | "manager" | "country_head"
```

### Issue: "Unable to fetch users" error

**Solution**:
1. Check IAM permissions for DynamoDB access
2. Verify table names in service files match your actual table names
3. Check AWS credentials are properly configured

### Issue: Custom domain not working

**Solution**:
1. Wait 10-30 minutes for DNS propagation
2. Check CNAME record is correctly added to your DNS provider
3. Verify SSL certificate status in Amplify Console

### Issue: Build fails on Amplify

**Solution**:
1. Check build logs in Amplify Console
2. Verify `package.json` has all dependencies
3. Ensure Node.js version is 18+ in build settings

---

## Environment Variables (Optional)

For multiple environments (dev/staging/prod), use environment variables:

1. Create `.env.production`:
```env
VITE_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_APP_CLIENT_ID=XXXXXXXXXXXXXXXXX
VITE_REGION=us-east-1
VITE_USERS_TABLE=Users-prod
```

2. Update `src/aws-config.js`:
```javascript
const awsconfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      // ...
    },
  },
}
```

3. Add environment variables in Amplify Console:
   - Go to App Settings → Environment variables
   - Add each variable

---

## Cost Estimate

### AWS Amplify Hosting:
- Build minutes: $0.01 per minute (Free tier: 1,000 minutes/month)
- Storage: $0.023 per GB/month (Free tier: 5 GB)
- Data transfer: $0.15 per GB (Free tier: 15 GB/month)

### Typical Monthly Cost:
- Low traffic admin panel: **$0-5/month** (mostly free tier)
- Medium traffic: **$10-20/month**

### Domain:
- Route 53 hosted zone: **$0.50/month**
- Custom domain: **$10-15/year** (varies by registrar)

---

## Support

For issues related to:
- **Admin Panel**: Check this README and troubleshooting section
- **AWS Amplify**: https://docs.amplify.aws/
- **DynamoDB**: https://docs.aws.amazon.com/dynamodb/

---

## License

Proprietary - MaSAT Voice Chat Platform
