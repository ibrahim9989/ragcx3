# Request Access Form - Supabase Integration Setup

## 📋 Overview

This guide will help you set up the Supabase database table for your request access form and test the integration.

## 🗄️ Database Setup

### Step 1: Create the Table

1. Open your **Supabase Dashboard**: https://supabase.com/dashboard
2. Navigate to your project: `dgpxefrwrnyiyvjmgzcb`
3. Go to **SQL Editor**
4. Copy and paste the contents of `database/create-request-access-table.sql`
5. Click **Run** to execute the SQL

### Step 2: Verify Table Creation

After running the SQL, you should see:

- ✅ Table `public.request_access` created
- ✅ Indexes added for better performance
- ✅ Row Level Security (RLS) enabled
- ✅ Policies created for anonymous inserts
- ✅ Triggers set up for automatic timestamps

## 🧪 Testing the Integration

### Test the Database Connection

```bash
npm run test:request-access
```

This will test:

- ✅ Form submission to Supabase
- ✅ Email validation
- ✅ Duplicate email prevention
- ✅ Data retrieval (if authenticated)

### Test the Form UI

```bash
npm run dev
```

Then navigate to `/request-access` and test:

- ✅ Fill out the form with valid data
- ✅ Submit and verify success message
- ✅ Test validation errors (empty fields, invalid email)
- ✅ Test duplicate submission prevention

## 📊 Database Schema

### Table: `public.request_access`

| Column         | Type         | Description                            |
| -------------- | ------------ | -------------------------------------- |
| `id`           | UUID         | Primary key (auto-generated)           |
| `name`         | VARCHAR(255) | Full name (required)                   |
| `email`        | VARCHAR(255) | Email address (required, unique)       |
| `company`      | VARCHAR(255) | Company name (optional)                |
| `job_title`    | VARCHAR(255) | Job title (optional)                   |
| `use_case`     | TEXT         | How they plan to use RAG.CX (optional) |
| `status`       | VARCHAR(50)  | Request status (default: 'pending')    |
| `submitted_at` | TIMESTAMP    | When request was submitted             |
| `created_at`   | TIMESTAMP    | Record creation time                   |
| `updated_at`   | TIMESTAMP    | Last update time (auto-updated)        |

### Status Values

- `pending` - New request (default)
- `approved` - Access granted
- `rejected` - Request denied
- `reviewed` - Under review

## 🔒 Security Features

### Row Level Security (RLS)

- **Anonymous users** can INSERT new requests
- **Authenticated users** can SELECT/view requests
- **No one** can UPDATE/DELETE without proper permissions

### Data Validation

- ✅ Email format validation
- ✅ Required field validation
- ✅ Duplicate email prevention
- ✅ Input sanitization (trim whitespace)

### Privacy Protection

- Email addresses are automatically converted to lowercase
- No sensitive data is stored in plain text
- Proper indexing for performance without exposing data

## 📈 Admin Features

The service includes admin functions for managing requests:

```typescript
// Get all submissions (requires authentication)
const submissions = await getRequestAccessSubmissions(50, 0);

// Update request status (requires authentication)
const result = await updateRequestAccessStatus(id, "approved");
```

## 🔧 Form Features

### Enhanced Form Fields

- ✅ **Name** (required)
- ✅ **Email** (required, validated)
- ✅ **Company** (optional)
- ✅ **Job Title** (optional)
- ✅ **Use Case** (optional, textarea)

### User Experience

- ✅ Real-time error clearing
- ✅ Loading states during submission
- ✅ Success confirmation with reference ID
- ✅ Helpful error messages
- ✅ Duplicate submission prevention

### Form Validation

- ✅ Client-side validation
- ✅ Server-side validation
- ✅ Email format checking
- ✅ Required field enforcement

## 📝 Next Steps

1. **Run the SQL script** in your Supabase dashboard
2. **Test the integration** using `npm run test:request-access`
3. **Test the form UI** by running `npm run dev` and visiting `/request-access`
4. **Monitor submissions** in your Supabase dashboard under the `request_access` table
5. **Set up email notifications** (optional) for new submissions

## 🛠️ Troubleshooting

### Common Issues

**"Table does not exist" error:**

- Ensure you ran the SQL script in Supabase
- Check that the table was created in the `public` schema

**"Permission denied" error:**

- Verify RLS policies are correctly applied
- Check that anonymous users have INSERT permissions

**Form validation not working:**

- Check browser console for JavaScript errors
- Verify the service import path is correct

**Duplicate email not prevented:**

- Ensure the unique constraint was applied
- Check that email normalization is working (lowercase)

### Getting Help

- Check the Supabase logs in your dashboard
- Review browser console for client-side errors
- Test with the provided test script to isolate issues

## 📊 Monitoring

You can monitor form submissions in your Supabase dashboard:

1. Go to **Table Editor**
2. Select `public.request_access`
3. View all submissions, their status, and timestamps
4. Filter by status, date, or search by email/name
