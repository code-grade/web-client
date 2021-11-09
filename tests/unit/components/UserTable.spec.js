import { expect } from 'chai';
import { sinon } from 'sinon';
import { shallowMount,createLocalVue } from '@vue/test-utils';
import UserTable from '@/components/UserTable.vue';
const localVue = createLocalVue();
import api from '@/api' ;

jest.mock("@/api", () => {
  return {
    user:{
      all:jest.fn()
    }
  };
});

describe("initialize", () => {

  beforeEach(() => {
    api.user.all.mockImplementation(() => {
      return Promise.resolve([{status:200},
        [{username:"student", firstname:"Uthpala",lastname:"Nethmini",email:{email:"a@g.com",verified:true}}]]
        );
    });
  });

  it("displays list of users", () => {
    const wrapper = shallowMount(UserTable, { localVue });
    expect(wrapper.vm.initialize).to.be.a("function")
  });

  /*const func = async()=>{  
    api.user.all = jest.fn();
    return [{status:200},[{username:"student", firstname:"Uthpala",lastname:"Nethmini",email:{email:"a@g.com",verified:true}}]];
};
  it('should return userslist when it passed', async() => {
    /*api.user.all.mockResolvedValue(
      [200,[{username:"student", firstname:"Uthpala",lastname:"Nethmini",email:{email:"a@g.com",verified:true}}]]
      [{status:200},[{username:"student", firstname:"Uthpala",lastname:"Nethmini",email:{email:"a@g.com",verified:true}}]]
    )
    const wrapper = shallowMount(UserTable)
    const [status,res_data]=await func();
    expect(wrapper.vm.initialize).to.be.a("function")
  })*/

  /*it('should return error message when it failed', async() => {
    /*api.user.all.mockResolvedValue(
      [200,[{username:"student", firstname:"Uthpala",lastname:"Nethmini",email:{email:"a@g.com",verified:true}}]]
    )
    const wrapper = shallowMount(UserTable)
    expect(wrapper.vm.initialize).to.be.a("function")
  })*/
})

/*describe("toggleEnableUser", () => {
  it('should return success message when it passed', async() => {
    /*api.user.all.mockResolvedValue(
      [200,[{username:"student", firstname:"Uthpala",lastname:"Nethmini",email:{email:"a@g.com",verified:true}}]]
    )
    const wrapper = shallowMount(UserTable)
    expect(wrapper.vm.toggleEnableUser).to.be.a("function")
  })

  it('should return error message when itfailed', async() => {
    /*api.user.all.mockResolvedValue(
      [200,[{username:"student", firstname:"Uthpala",lastname:"Nethmini",email:{email:"a@g.com",verified:true}}]]
    )
    const wrapper = shallowMount(UserTable)
    expect(wrapper.vm.toggleEnableUser).to.be.a("function")
  })
})*/
