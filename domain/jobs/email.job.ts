import cron from 'node-cron';
import { EmailService } from '../services/email.service';
import { generateMultaEmailTemplate } from '../templates/email.template';
import { envs } from '../../src/config/envs.plugin';
import { MultaModel } from '../../src/data/models/multa.model';

export const emailJob = () => {
  const emailService = new EmailService();

  cron.schedule("*/10 * * * * *", async ()=>{
    try{
      const allMultas = await MultaModel.find({isEmailSent:false});
      if(!allMultas.length){
        console.log('No hay multas por enviar');
        return
      }
      await Promise.all(
        allMultas.map(async (Multa)=>{
            console.log(Multa);
            try{
              const htmlBody= generateMultaEmailTemplate(Multa.plate,Multa.city,Multa.state,Multa.speed,Multa.limit,Multa.lat,Multa.lng,Multa.creationDate);

                await emailService.sendEmail({
                    to: envs.MAIL_TO,
                    subject:`Multa: ${Multa.creationDate}`,
                    htmlBody:htmlBody
                });
                console.log(`Email enviado para la multa con Id: ${Multa._id}`);
                let updateMulta = {
                    plate:Multa.plate,
                    city:Multa.city,
                    state:Multa.state,
                    speed:Multa.speed,
                    limit:Multa.limit,
                    lat:Multa.lat,
                    lng:Multa.lng,
                    isEmailSent: true
                };
                await MultaModel.findByIdAndUpdate(Multa._id,updateMulta);
                console.log(`Multa actualizada para el Id: ${Multa._id}`);
            }
            catch(error){
                console.error("Error al procesar la multa");
            }
        })
    );}
    catch(error){
      console.error("Error al enviar el email");
    }
  });
}

