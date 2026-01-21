import { CronJob } from 'cron';
import Pincode from '../models/pincodeModel.js';
import axios from 'axios';


export const syncPincodesJob = new CronJob('0 2 * * 0', async () => {
    console.log('Cron Job Started: Syncing all pincodes from data.gov.in...');
    
    const apiKey = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";
    const limit = 1000;
    let offset = 0;
    let totalSynced = 0;
    let keepFetching = true;

    try {
        while (keepFetching) {
            console.log(`Fetching batch: Offset ${offset}, Limit ${limit}`);
            const url = `https://api.data.gov.in/resource/5c2f62fe-5afa-4119-a499-fec9d604d5bd?api-key=${apiKey}&format=json&limit=${limit}&offset=${offset}`;
            
            const response = await axios.get(url);
            const data = response.data;
            
            if (!data.records || data.records.length === 0) {
                keepFetching = false;
                break;
            }

         
            const bulkOps = data.records.map(record => {
                const isDeliverable = record.delivery === 'Delivery';
                const pincode = record.pincode;
                
                if (!pincode) return null;

                return {
                    updateOne: {
                        filter: { pincode: pincode.toString() },
                        update: {
                            $set: {
                                pincode: pincode.toString(),
                                details: {
                                    district: record.district,
                                    state: record.statename,
                                    country: "India",
                                    name: record.officename,
                                    deliveryStatus: record.delivery
                                },
                                isDeliverable: isDeliverable
                            }
                        },
                        upsert: true
                    }
                };
            }).filter(op => op !== null);

            if (bulkOps.length > 0) {
                await Pincode.bulkWrite(bulkOps);
                totalSynced += bulkOps.length;
            }

          
            if (offset + limit >= data.total) {
                keepFetching = false;
            } else {
                offset += limit;
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        
        console.log(`Cron Job Finished: Successfully synced ${totalSynced} pincodes.`);
        
    } catch (error) {
        console.error('Cron Job Sync Error:', error.message);
    }
});

export const startCronJobs = () => {
    syncPincodesJob.start();
    console.log('Cron jobs scheduled: Pincode Sync (Weekly)');
    

};
