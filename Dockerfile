# Use the official Node.js image as the base image
FROM node:20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the rest of the application code
COPY . .

# Install dependencies
RUN npm install

# ENV NEXT_PUBLIC_JWT_SECRET=NEXT_PUBLIC_JWT_SECRET
# ENV NEXT_PUBLIC_NEXTAUTH_URL=NEXT_PUBLIC_NEXTAUTH_URL
# ENV NEXT_PUBLIC_AUTH_SECRET=NEXT_PUBLIC_AUTH_SECRET
# ENV NEXT_PUBLIC_DATABASE_URL=NEXT_PUBLIC_DATABASE_URL
# ENV NEXT_PUBLIC_SOLANA_ENDPOINT=NEXT_PUBLIC_SOLANA_ENDPOINT
# ENV NEXT_PUBLIC_GOOGLE_CLIENT_ID=NEXT_PUBLIC_GOOGLE_CLIENT_ID
# ENV NEXT_PUBLIC_GOOGLE_CLIENT_SECRET=NEXT_PUBLIC_GOOGLE_CLIENT_SECRET
# ENV NEXT_PUBLIC_GMAIL_USER=NEXT_PUBLIC_GMAIL_USER
# ENV NEXT_PUBLIC_GMAIL_PASSWORD=NEXT_PUBLIC_GMAIL_PASSWORD
# ENV NEXT_PUBLIC_RECLAIM_APP_SECRET=NEXT_PUBLIC_RECLAIM_APP_SECRET
# ENV NEXT_PUBLIC_RECLAIM_CALLBACK_URL=NEXT_PUBLIC_RECLAIM_CALLBACK_URL

## put DATABASE_URL in apps/web/.env
RUN echo DATABASE_URL=$DATABASE_URL >> apps/web/.env
RUN echo NEXTAUTH_URL=$NEXTAUTH_URL >> apps/web/.env
RUN npm run build --force
## Remove .env file
RUN rm apps/web/.env

# Build the Next.js application
# RUN npm run build --force

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

# COPY entrypoint.sh /usr/bin/
# RUN chmod +x /usr/bin/entrypoint.sh
# ENTRYPOINT ["entrypoint.sh"]