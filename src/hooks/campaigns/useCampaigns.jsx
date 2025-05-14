import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useCampaigns(){
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/campaigns');
        setCampaigns(response.data);
        setError('');
      } catch (err) {
        setError('Error al cargar las campañas');
        console.error('Error fetching campaigns:', err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchCampaigns();
    }, []);

    const deleteCampaign = async (campaignId) => {
      try {
        await axios.delete(`/api/campaigns/${campaignId}`);
        setCampaigns(prev => prev.filter(campaign => campaign.campaignId !== campaignId));
        return true;
      } catch (err) {
        setError('Error al eliminar la campaña');
        return false;
      }
    };

    return {
      campaigns,
      loading,
      error,
      fetchCampaigns,
      deleteCampaign,
      setError
    };
};
