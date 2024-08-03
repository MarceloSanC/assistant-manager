import React, { useState, useEffect } from 'react';
import '../../styles/Manager.css';

function Profile({ profile, setProfile }) {
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(() => {
    if (profile.profileImage) {
      const url = URL.createObjectURL(profile.profileImage);
      setProfileImageUrl(url);

      // Cleanup the object URL on unmount
      return () => URL.revokeObjectURL(url);
    }
  }, [profile.profileImage]);

  return (
    <div className="form-section">
      <h2>Perfil Whats App</h2>
      <div className='profile-image-section'>
        <div className="form-group">
          <label>Imagem de perfil do Whats App</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfile('profileImage', e.target.files[0])}
          />
          <span className="hint">Selecione uma imagem para o perfil do Whats App.</span>
        </div>
        <div className="form-group">
          {profileImageUrl && (
            <div className="profile-image-container">
              <img src={profileImageUrl} alt="Profile" className="profile-image" />
            </div>
          )}
        </div>
      </div>
      <div className="form-group">
        <label>Nome do Estabelecimento</label>
        <input
          type="text"
          value={profile.establishmentName}
          onChange={(e) => setProfile('establishmentName', e.target.value)}
        />
        <span className="hint">Digite o nome do seu estabelecimento.</span>
      </div>
      <div className="form-group">
        <label>Número de telefone do Assistente</label>
        <input
          type="tel"
          value={profile.phoneNumber}
          onChange={(e) => setProfile('phoneNumber', e.target.value)}
        />
        <span className="hint">Digite o número de telefone do assistente.</span>
      </div>
    </div>
  );
}

export default Profile;