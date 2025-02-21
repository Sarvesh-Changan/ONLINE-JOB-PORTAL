import cron from "node-cron";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const newsLetterCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    // * minute * hour * day * month * weekdays
    console.log("Running Cron Automation");
    
    const jobs = await Job.find({ newsLettersSent: false });
    
    for (const job of jobs) {
      try {
        const filteredUsers = await User.find({
          $or: [
            { "niches.firstNiche": job.jobNiche },
            { "niches.secondNiche": job.jobNiche },
            { "niches.thirdNiche": job.jobNiche },
          ],
        });

        for (const user of filteredUsers) {
          const subject = `🚀 Hot Job Alert: Exciting ${job.title} Opportunity at ${job.companyName}!`;

          const message = `Hi ${user.name},  

Great news! We have an exciting job opportunity that matches your expertise.  
${job.companyName} is looking for a ${job.title}, and they’re hiring immediately!  

📌 Job Details:  
🔹 Position: ${job.title}  
🔹 Company: ${job.companyName}  
🔹 Location: ${job.location}  
🔹 Role: ${job.jobNiche}  
🔹 Salary: Rs. ${job.salary} per month  

🚀 Opportunities like this fill up fast, so don’t miss out!  

Wishing you the best of luck in your job search!  

Best Regards,  
JobMatrix Team  
`;

          sendEmail({
            email: user.email,
            subject,
            message,
          });
        }

        job.newsLettersSent = true;
        await job.save();
      } catch (error) {
        console.log("ERROR IN NODE CRON CATCH BLOCK");
        return next(console.error(error || "Some error in Cron."));
      }
    }
  });
};