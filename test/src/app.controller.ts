import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import axios from 'axios';
import { BodyGuard } from './body.guard';

interface RequestF extends Request {
  token: string,
  base_domain: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('auth')
  async auth(): Promise<object> {
    try {
      const data = await axios.get('https://app2.gnzs.ru/amocrm/test/oauth/get-token.php', {
        headers: {
          "Content-Type": "application/json",
          "X-Client-Id": "32022914",
        }
      })
  
      return data.data;
    } catch (e) {
      return e.response.data
      console.log(e.response.data)
    }
   }


  @Post('deal')
  @UseGuards(BodyGuard)
  async deal(@Body() body: RequestF): Promise<object> {
    try {
      const { token, base_domain } = body;

      const deals = [{
        name: "Новая сделка",
        price: 1000
      }]

      const data = await axios.post(`https://${base_domain}/api/v4/leads`, JSON.stringify(deals), {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
      
      const lead = data.data._embedded.leads?.map((lead: any) => ({
        id: lead.id,
        request_id: lead.request_id,
      }));

      return lead[0];
    } catch (e) {
      if (e.response.status === 401) {
        return ({
          status: 401,
          message: 'Unauthorized',
        });
      } else if (e.response.status === 400) {
        return ({
          status: 400,
          message: 'Bad Request',
        });
      }
    }
  }

  @Post('contact')
  @UseGuards(BodyGuard)
  async contact(@Body() body: RequestF): Promise<object> {
    try {
      const { token, base_domain } = body;

      const contactR = [{
        first_name: "Новый контакт",
      }]

      const data = await axios.post(`https://${base_domain}/api/v4/contacts`, JSON.stringify(contactR), {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
      
      const contact = data.data._embedded.contacts?.map((contact: any) => ({
        id: contact.id,
        request_id: contact.request_id,
      }));

      return contact[0] ;
    } catch (e) {
      console.log(e)
    }
  }

  @Post('company')
  @UseGuards(BodyGuard)
  async company(@Body() body: RequestF): Promise<object> {
    try {
      const { token, base_domain } = body;

      const companyR = [{
        first_name: "Новая компания",
      }]

      const data = await axios.post(`https://${base_domain}/api/v4/companies`, JSON.stringify(companyR), {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        }
      })
      
      const company = data.data._embedded.companies?.map((company: any) => ({
        id: company.id,
        request_id: company.request_id,
      }));

      return company[0];
    } catch (e) {
      if (e.response.status === 401) {
        return ({
          status: 401,
          message: 'Unauthorized',
        });
      } else if (e.response.status === 400) {
        return ({
          status: 400,
          message: 'Bad Request',
        });
      }
    }
  }

  @Get()
  getHello(): any {
    return ({
      status: 'ok',
    });
  }
}
