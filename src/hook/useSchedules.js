import { useState, useEffect } from 'react';
import { 
  getAllSchedules, 
  getActiveSchedules, 
  cleanupExpiredSchedules 
} from '../utils/scheduleUtils';

/**
 * Custom hook for managing schedules
 * @param {boolean} activeOnly If true, returns only active (non-expired) schedules
 * @returns {Object} { schedules, loading, error, refreshSchedules }
 */
const useSchedules = (activeOnly = true) => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const loadSchedules = () => {
    try {
      setLoading(true);
      // Clean up expired schedules in localStorage
      cleanupExpiredSchedules();
      
      // Get either all schedules or only active ones based on parameter
      const schedulesData = activeOnly ? getActiveSchedules() : getAllSchedules();
      
      // Sort schedules by start_time in ascending order
      schedulesData.sort((a, b) => new Date(a.start_time) - new Date(b.start_time));
      
      setSchedules(schedulesData);
      setError(null);
    } catch (err) {
      console.error('Error loading schedules:', err);
      setError('Failed to load schedules');
    } finally {
      setLoading(false);
    }
  };
  
  // Load schedules on mount and when dependencies change
  useEffect(() => {
    loadSchedules();
    
    // Set up interval to periodically refresh schedules (optional)
    const intervalId = setInterval(() => {
      loadSchedules();
    }, 60000); // Refresh every minute to check for newly expired schedules
    
    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [activeOnly]);
  
  // Function to manually refresh schedules
  const refreshSchedules = () => {
    loadSchedules();
  };
  
  return { schedules, loading, error, refreshSchedules };
};

export default useSchedules;
