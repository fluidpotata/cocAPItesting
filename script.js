const uri = window.location.href;

const apiUrl = uri+'/coc.json'; //localtest

document.addEventListener('DOMContentLoaded', async () => {
    const content = document.getElementById('content');

    try {

        const response = await fetch(apiUrl); // Replace with your API endpoint
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();

        data.clans.forEach(clan => {
            // Create clan card
            const clanDiv = document.createElement('div');
            clanDiv.className = 'clan';

            const clanBadge = document.createElement('img');
            clanBadge.src = clan.badgeUrls.medium;
            clanBadge.alt = `${clan.name} badge`;

            const clanDetails = document.createElement('div');
            clanDetails.className = 'clan-details';
            clanDetails.innerHTML = `
        <h2>${clan.name}</h2>
        <p>Level: ${clan.clanLevel}</p>
        <p>Tag: ${clan.tag}</p>
      `;

            clanDiv.appendChild(clanBadge);
            clanDiv.appendChild(clanDetails);

            const membersDiv = document.createElement('div');
            membersDiv.className = 'members';

            clan.members.forEach(member => {
                const memberDiv = document.createElement('div');
                memberDiv.className = 'member';
                memberDiv.innerHTML = `
          <span>${member.name} (${member.tag})</span>
          <span>Town Hall Level: ${member.townHallLevel}</span>
        `;
                membersDiv.appendChild(memberDiv);
            });

            content.appendChild(clanDiv);
            content.appendChild(membersDiv);
        });
    } catch (error) {
        console.error('Error fetching or processing data:', error);
        content.innerHTML = '<p>Failed to load clan data. Please try again later.</p>';
    }
});
