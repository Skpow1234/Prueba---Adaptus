# AdaptusSoftwareIntern

## Problem Statement

The goal is to create a JavaScript module that processes arrays of file IDs, identifies files that have not been scanned yet, and uploads the result to AWS S3. The module should handle promises and return either the processed array or an error object.

## Solution

### Structure of the Module

The module follows a modular structure, including three main functions: `load`, `validate`, and `setup`, and a `run` function that orchestrates the entire process.

1. **load(input):**
   - This function loads parameters from the input object, including arrays of file IDs (`files`, `scannedFiles`, and `erroredFiles`).

2. **validate(config):**
   - Validates the format of the input arrays to ensure they are all in the expected format (arrays).

3. **setup(config):**
   - Performs any additional setup logic if needed.

4. **uploadToS3(data):**
   - This function calls the `add` function from the `s3_driver` module to upload data to AWS S3. It returns a promise and handles errors using the `.catch` block.

5. **run(input):**
   - Orchestrates the entire process using `async/await`.
   - Calls `load`, `validate`, and `setup` functions.
   - Processes arrays to find file IDs that have not been scanned yet.
   - Calls `uploadToS3` to upload the result array to AWS S3.
   - Returns either the processed array or an error object.
Take into account, that this is just an example code, this won't work because this is not a Node.js app, just a JavaScript class, and we also don't have the class to implement the logic of uploading files or logs into S3, as well, we would need a .env file to have all of our environment variables.
