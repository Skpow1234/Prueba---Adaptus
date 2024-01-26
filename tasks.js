module.exports = (resources) => {
  const shared = {
    INVALID_ARRAY_FORMAT: 'Invalid array format',
  };

  const { s3_driver, _debug } = resources;

  const my = {};

  my.run = async (input) => {
    try {
      const data = await setup(await validate(await load(input)));
      const { files, scannedFiles, erroredFiles } = data;

      // Process the arrays to find file IDs that have not been scanned yet
      const output = files.filter(fileId => !scannedFiles.includes(fileId) && !erroredFiles.includes(fileId));

      // Upload the result array to AWS S3 using s3_driver
      await uploadToS3(output);

      return output;
    } catch (error) {
      _debug(error.stack);
      throw { status: '-error-', message: error.message || 'Unknown error occurred' };
    }
  };

  function uploadToS3(data) {
    const s3Path = 'YOUR_S3_PATH'; // Replace with your actual S3 path
    return s3_driver.add(s3Path, data)
      .catch(error => {
        throw new Error('Error uploading data to S3: ' + error.message);
      });
  }

  function load(input) {
    const config = {
      files: input.files || [],
      scannedFiles: input.scannedFiles || [],
      erroredFiles: input.erroredFiles || [],
    };
    return config;
  }

  function validate(config) {
    // Validate array formats
    if (!Array.isArray(config.files) || !Array.isArray(config.scannedFiles) || !Array.isArray(config.erroredFiles)) {
      throw new Error(shared.INVALID_ARRAY_FORMAT);
    }
    return config;
  }

  async function setup(config) {
    // Add any additional setup logic if needed
    return config;
  }

  return my;
};
