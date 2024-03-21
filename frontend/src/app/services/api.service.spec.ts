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

  describe('load', () => {
    it('givenLoadCharacterRequest_whenRequestReturns200_thenDispatchResponse', () => {
      const mockCharacters = [
        {
          title: "asdf",
          body: "asdfs",
          username: "asdfasdf",
          dateCreated: "2024-03-15T14:37:13.000+00:00",
          dateModified: null,
        },
        {
          title: "asdfsdf",
          body: "asdfsd",
          username: "sdfasdf",
          dateCreated: "2024-03-17T02:49:45.000+00:00",
          dateModified: null,
        }
      ];

      const mockApiResponse = {
        _embedded: {
          characters: mockCharacters
        }
      };

      const endpoint = 'characters'

      service.load(endpoint).subscribe(response => {
        expect(response).toEqual(mockCharacters);
      });
      const req = httpMock.expectOne(`http://localhost:8080/api/${endpoint}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockApiResponse);
    });
  })
  //   it('given_when_then', () => {

  //   });
  //   it('given_when_then', () => {

  //   });
  // });
  // describe('post', () => {
  //   it('given_when_then', () => {

  //   }); 
  //   it('given_when_then', () => {

  //   });
  //   it('given_when_then', () => {

  //   });
  // })
  // describe('put', () => {
  //   it('given_when_then', () => {

  //   });    
  //   it('given_when_then', () => {

  //   });
  // })
  // describe('patch', () => {
  //   it('given_when_then', () => {

  //   });
  //   it('given_when_then', () => {

  //   });
  // })
})