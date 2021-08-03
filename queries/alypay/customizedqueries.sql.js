const getProfilePictureInfo = () => `
    SELECT
    SUBSTRING_INDEX(kyc.avatar, ',', 1) as filename,
    SUBSTRING_INDEX(kyc.avatar, ',', -1) as filetype

    FROM alypay.users as u
    INNER JOIN alypay.information_users_kyc as kyc on kyc.id_users = u.id
    WHERE u.id = :id;
    `

module.exports = {
    getProfilePictureInfo
}