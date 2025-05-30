/* convert image → base64 */
const fileToDataURL = f =>
  new Promise(res => {
    const fr = new FileReader();
    fr.onload = () => res(fr.result);
    fr.readAsDataURL(f);
  });

document.getElementById('builderForm').addEventListener('submit', async e => {
  e.preventDefault();
  const val = id => document.getElementById(id).value.trim();

  const data = {
    name:   val('name'),
    role:   val('role'),
    tagline:val('tagline'),
    accent: val('accent'),
    about:  val('about'),
    socials:{
      email   : val('linkEmail'),
      linkedin: val('linkLinkedIn'),
      github  : val('linkGitHub'),
      twitter : val('linkTwitter'),
      leetcode: val('linkLeet'),
      facebook: val('linkFacebook')
    },
    edu: val('education').split('\\n').filter(Boolean),
    exp: val('experience').split('\\n').filter(Boolean),
    profilePic:''
  };

  const pic = document.getElementById('profile').files[0];
  if (pic) data.profilePic = await fileToDataURL(pic);

  localStorage.setItem('portfolioData', JSON.stringify(data));
  location.href = 'preview.html';
});
