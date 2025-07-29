export const uploadToCloudinary = async (fileOrBlob, folder = 'donations') => {
  const cloudName = 'dlltuczsr'; // replace with your actual cloud name
  const uploadPreset = 'anonymous_upload'; // replace with your unsigned preset

  const formData = new FormData();
  formData.append("file", fileOrBlob);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (data.secure_url) {
      return data.secure_url;
    } else {
      throw new Error(data.error?.message || "Upload failed");
    }
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    throw err;
  }
};
