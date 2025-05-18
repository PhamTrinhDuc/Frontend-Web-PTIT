/**
 * Utility functions for schedule management
 */

/**
 * Get all schedules from localStorage
 * @returns {Array} Array of schedule objects
 */
export const getAllSchedules = () => {
  try {
    return JSON.parse(localStorage.getItem('schedules')) || [];
  } catch (error) {
    console.error('Error retrieving schedules from localStorage:', error);
    return [];
  }
};

/**
 * Get only active (non-expired) schedules
 * @returns {Array} Array of non-expired schedule objects
 */
export const getActiveSchedules = () => {
  const now = new Date();
  const allSchedules = getAllSchedules();
  
  console.log('Current time:', now);
  console.log('All schedules:', allSchedules);
  
  const activeSchedules = allSchedules.filter(schedule => {
    const scheduleDate = new Date(schedule.start_time);
    console.log('Schedule time:', schedule.title, scheduleDate, 'Is active:', scheduleDate > now);
    return scheduleDate > now;
  });
  
  console.log('Active schedules:', activeSchedules);
  return activeSchedules;
};

/**
 * Delete a schedule by ID
 * @param {number} id The ID of the schedule to delete
 * @returns {boolean} Success status
 */
export const deleteSchedule = (id) => {
  try {
    const schedules = getAllSchedules();
    const updatedSchedules = schedules.filter(schedule => schedule.id !== id);
    localStorage.setItem('schedules', JSON.stringify(updatedSchedules));
    return true;
  } catch (error) {
    console.error('Error deleting schedule:', error);
    return false;
  }
};

/**
 * Update a schedule
 * @param {Object} updatedSchedule The updated schedule object (must include id)
 * @returns {boolean} Success status
 */
export const updateSchedule = (updatedSchedule) => {
  try {
    if (!updatedSchedule.id) {
      throw new Error('Schedule ID is required for update');
    }
    
    const schedules = getAllSchedules();
    const updatedSchedules = schedules.map(schedule => 
      schedule.id === updatedSchedule.id ? updatedSchedule : schedule
    );
    
    localStorage.setItem('schedules', JSON.stringify(updatedSchedules));
    return true;
  } catch (error) {
    console.error('Error updating schedule:', error);
    return false;
  }
};

/**
 * Clean up expired schedules (optional, can be called periodically)
 * @returns {number} Number of expired schedules removed
 */
export const cleanupExpiredSchedules = () => {
  try {
    const now = new Date();
    const allSchedules = getAllSchedules();
    
    const activeSchedules = allSchedules.filter(schedule => {
      const scheduleDate = new Date(schedule.start_time);
      return scheduleDate > now;
    });
    
    const removedCount = allSchedules.length - activeSchedules.length;
    
    if (removedCount > 0) {
      localStorage.setItem('schedules', JSON.stringify(activeSchedules));
    }
    
    return removedCount;
  } catch (error) {
    console.error('Error cleaning up expired schedules:', error);
    return 0;
  }
};
