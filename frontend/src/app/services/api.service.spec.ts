import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { ApiService } from "./api.service";
import { Store } from "@ngrx/store";
import { TestBed } from "@angular/core/testing";

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;
  let store: jasmine.SpyObj<Store>;
  let mockDispatch: jasmine.Spy;

  beforeEach(() => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ApiService,
        { provide: Store, useValue: storeSpy }
      ]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(Store as any);
    mockDispatch = store.dispatch as jasmine.Spy;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe('get', () => {
    it('given_when_then', () => {

    });
    it('given_when_then', () => {

    });
    it('given_when_then', () => {

    });
  });
  describe('post', () => {
    it('given_when_then', () => {

    }); 
    it('given_when_then', () => {

    });
    it('given_when_then', () => {

    });
  })
  describe('put', () => {
    it('given_when_then', () => {

    });    
    it('given_when_then', () => {

    });
  })
  describe('patch', () => {
    it('given_when_then', () => {

    });
    it('given_when_then', () => {

    });
  })
})