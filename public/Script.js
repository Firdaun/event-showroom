async function loadRankingData() {
    const container = document.getElementById('ranking-container');
    if (!container)
        return;
    try {
        const response = await fetch('http://localhost:5000/api/ranking');
        if (!response.ok) {
            throw new Error('Gagal mengambil data dari server');
        }
        const data = (await response.json());
        const rankings = data.ranking;
        const renderData = () => {
            container.innerHTML = '';
            rankings.forEach((member) => {
                const card = document.createElement('div');
                card.className = 'member-card';
                card.setAttribute('data-rank', member.rank.toString());
                const cleanName = member.room.name.replace(/\s*[（\(]JKT48[）\)]/i, '');
                card.innerHTML = `
                    <div class="rank-info">
                        <div class="rank-number">${member.rank}</div>
                        <div class="member-details">
                            <h2>${cleanName}</h2>
                        </div>
                    </div>
                    <div class="point-info">
                        <div class="points">${member.point.toLocaleString('id-ID')}</div>
                        <div class="point-label">Points</div>
                    </div>
                `;
                container.appendChild(card);
            });
        };
        if (!document.startViewTransition) {
            renderData();
        }
        else {
            document.startViewTransition(() => {
                renderData();
            });
        }
    }
    catch (e) {
        console.error("Terjadi kesalahan:", e.message);
        container.innerHTML = `
            <div style="text-align: center; color: #ef4444; padding: 20px;">
                Gagal memuat data. Pastikan server backend main.js sudah berjalan.
            </div>
        `;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    loadRankingData();
    setInterval(loadRankingData, 20000);
});
export {};
