import { useState } from 'react';
import styled from 'styled-components';

const AvatarOptions = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

const AvatarOption = styled.img`
  width: 60px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    border-color: #00ffcc;
    transform: scale(1.1);
  }
`;

const UploadInput = styled.input`
  margin-top: 1rem;
  color: white;
`;

const SubmitButton = styled.button`
  background: #00ffcc;
  color: black;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  margin-top: 1rem;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background: #00bfa5;
  }
`;

const PreviewImage = styled.img`
  width: 80px;
  border-radius: 50%;
  margin-top: 1rem;
  border: 2px solid #00ffcc;
`;

export default function AvatarSelector({ avatars, onUserUpdate }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file || null);
    if (file) setPreviewURL(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    const token = localStorage.getItem('token');

    fetch('http://localhost:5000/api/user/upload-avatar', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Upload failed: ${text}`);
        }
        return res.json();
      })
      .then((updatedUser) => {
        console.log('Upload success, user:', updatedUser);
        onUserUpdate(updatedUser);
      })
      .catch((err) => console.error('Upload error:', err));
  };

  return (
    <>
      <AvatarOptions>
        {avatars.map((img) => (
          <AvatarOption
            key={img}
            src={`/avatars/${img}`}
            alt={img}
            onClick={async () => {
              const token = localStorage.getItem('token');
              await fetch('http://localhost:5000/api/user/avatar', {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ avatar: img }),
              });

              const res = await fetch('http://localhost:5000/api/user/profile', {
                headers: { Authorization: `Bearer ${token}` },
              });
              const userData = await res.json();
              onUserUpdate(userData);
            }}
          />
        ))}
      </AvatarOptions>

      <UploadInput type="file" accept="image/*" onChange={handleFileChange} />

      {previewURL && <PreviewImage src={previewURL} alt="Preview" />}

      {selectedFile && (
        <SubmitButton onClick={handleUpload}>✅ ارفع الصورة</SubmitButton>
      )}
    </>
  );
}
