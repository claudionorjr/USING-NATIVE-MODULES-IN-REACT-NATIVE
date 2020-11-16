//
//  Counter.swift
//  CounterApp
//
//  Created by C84396A on 16/11/20.
//

import Foundation
@objc(Counter)
class Counter: NSObject {
  private var count = 0
  
  @objc
  func increment() {
    count += 1
  }
  
  @objc
  func decrement(
    _ resolve: RCTPromiseResolveBlock,
    rejecter reject: RCTPromiseRejectBlock
  ) -> Void {
    if (count == 0) {
      let error = NSError(domain: "", code: 400, userInfo: nil)
      reject("E_COUNT", "count cannot be negative", error)
    } else {
      count -= 1
      resolve("count was decremented")
    }
  }
  
  @objc
  func getCount(_ callback: RCTResponseSenderBlock) {
    callback([count])
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
